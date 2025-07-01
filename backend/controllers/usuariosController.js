const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT U.id, U.nombre, U.correo, U.estado, U.fecha,
      (SELECT COUNT(*) FROM Mascota M WHERE M.id_dueno = U.id) AS mascotas
      FROM Usuario U
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const registerUser = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  tipo = req.body.tipo || 'dueno';
  console.log("REQ.BODY:", req.body);

  if (!nombre || !correo || !contrasena || !tipo) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios, incluyendo tipo' });
  }

  if (!['administrador', 'dueno'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo de usuario no válido' });
  }

  try {
    const [existing] = await db.query('SELECT id FROM Usuario WHERE correo = ?', [correo]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const [result] = await db.query(
      'INSERT INTO Usuario (nombre, correo, contrasena, tipo) VALUES (?, ?, ?, ?)',
      [nombre, correo, hashedPassword, tipo]
    );

    console.log("👤 Resultado de INSERT:", result);

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      id: result.insertId
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const loginUser = async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena)
    return res.status(400).json({ error: 'Email y contrasena son requeridos' });

  try {
    const [users] = await db.query('SELECT * FROM Usuario WHERE correo = ?', [correo]);
    if (users.length === 0)
      return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = users[0];
    const isMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!isMatch)
      return res.status(401).json({ error: 'contrasena incorrecta' });

    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        correo: user.correo,
        tipo: user.tipo 
      },
      process.env.JWT_SECRET || "claveSecreta",
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const { nombre, correo, contrasena, telefono } = req.body;

  try {
    let query = 'UPDATE Usuario SET';
    const params = [];

    if (nombre) {
      query += ' nombre = ?,';
      params.push(nombre);
    }

    if (correo) {
      query += ' correo = ?,';
      params.push(correo);
    }

    if (telefono) {
      query += ' telefono = ?,';
      params.push(telefono);
    }

    if (contrasena) {
      const hashed = await bcrypt.hash(contrasena, 10);
      query += ' contrasena = ?,';
      params.push(hashed);
    }

    query = query.slice(0, -1); // Quita la coma final
    query += ' WHERE id = ?';
    params.push(userId);

    await db.query(query, params);

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const obtenerContacto = async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await db.query('SELECT nombre, telefono, correo FROM Usuario WHERE id = ?', [userId]);
    console.log("ROWS:", rows);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const result = {
      correo: rows[0].correo,
      telefono: rows[0].telefono,
      nombre: rows[0].nombre
    };

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener el contacto del usuario' });
  }
};

const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const [mascotas] = await db.query('SELECT id FROM Mascota WHERE id_dueno = ?', [id]);

    for (const mascota of mascotas) {
      await db.query('DELETE FROM Localizacion WHERE mascota_id = ?', [mascota.id]);
    }

    await db.query('DELETE FROM Mascota WHERE id_dueno = ?', [id]);

    const [result] = await db.query('DELETE FROM Usuario WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario, mascotas y localizaciones eliminados correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

const cambiarContrasena = async (req, res) => {
  const { actual, nueva } = req.body;
  const userId = req.user.id;

  try {
    const [rows] = await db.query('SELECT contrasena FROM Usuario WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    const coincide = await bcrypt.compare(actual, rows[0].contrasena);
    if (!coincide) return res.status(400).json({ error: 'Contraseña actual incorrecta' });

    const hashedNueva = await bcrypt.hash(nueva, 10);
    await db.query('UPDATE Usuario SET contrasena = ? WHERE id = ?', [hashedNueva, userId]);

    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la contraseña' });
  }
};

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  updateUser,
  obtenerContacto,
  eliminarUsuario,
  cambiarContrasena
};
