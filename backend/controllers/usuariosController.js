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

  console.log("REQ.BODY:", req.body); 

  if (!nombre || !correo || !contrasena) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const [existing] = await db.query('SELECT id FROM Usuario WHERE correo = ?', [correo]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    await db.query(
      'INSERT INTO Usuario (nombre, correo, contrasena) VALUES (?, ?, ?)',
      [nombre, correo, hashedPassword]
    );

    res.status(201).json({ message: 'Usuario registrado exitosamente' });
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
      { id: user.id, nombre: user.nombre, correo: user.correo, rol: user.rol },

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
    const { nombre, correo, contrasena } = req.body;

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

      if (contrasena) {
        const hashed = await bcrypt.hash(contrasena, 10);
        query += ' contrasena = ?,';
        params.push(hashed);
      }

      query = query.slice(0, -1);
      query += ' WHERE id = ?';
      params.push(userId);

      await db.query(query, params);

      res.json({ message: 'Usuario actualizado correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};


module.exports = { registerUser, getUsers , loginUser , updateUser};