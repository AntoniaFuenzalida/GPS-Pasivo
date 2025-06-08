const db = require('../db');

const crearMascota = async (req, res) => {
  const { nombre, descripcion, id_dueno } = req.body;
  console.log("📥 Recibido:", req.body);

  if (!nombre || !id_dueno) {
    console.warn("⚠️ Falta nombre o id_dueno");
    return res.status(400).json({ error: 'Nombre e id_dueno son requeridos' });
  }

  try {
    const fecha_registro = new Date();
    const estado = 'monitoreada';

    const [usuarios] = await db.query('SELECT nombre FROM Usuario WHERE id = ?', [id_dueno]);
    console.log("🧑 Usuario encontrado:", usuarios);

    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const nombre_dueno = usuarios[0].nombre;

    console.log("📤 Insertando mascota en DB...");
    const [result] = await db.query(
      'INSERT INTO Mascota (nombre, descripcion, fecha_registro, estado, id_dueno, nombre_dueno) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, descripcion, fecha_registro, estado, id_dueno, nombre_dueno]
    );

    console.log("✅ Mascota creada con ID:", result.insertId);
    res.status(201).json({ id: result.insertId });

  } catch (error) {
    console.error("❌ Error al crear mascota:", error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const obtenerMascotas = async (req, res) => {
    try {
        
        const [mascotas] = await db.query('SELECT * FROM Mascota');
        console.log('Mascotas obtenidas:', mascotas);
        
        res.status(200).json(mascotas);
    } catch (error) {
        res.status(500).json({ 
            error: 'Error interno del servidor',
            details: error.message,
            code: error.code 
        });
    }
}

const obtenerMascotaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const [mascotas] = await db.query('SELECT * FROM Mascota WHERE id = ?', [id]);
        
        if (mascotas.length === 0) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }

        res.status(200).json(mascotas[0]);
    } catch (error) {
        console.error('Error al obtener la mascota:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const eliminarMascota = async (req, res) => {
  const { id } = req.params;

  try {
    // Verifica qué localizaciones están asociadas
    const [locs] = await db.query('SELECT * FROM Localizacion WHERE mascota_id = ?', [id]);
    console.log("Localizaciones que se van a eliminar:", locs);

    // Elimina primero las localizaciones asociadas
    await db.query('DELETE FROM Localizacion WHERE mascota_id = ?', [id]);

    // Luego elimina la mascota
    const [result] = await db.query('DELETE FROM Mascota WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Mascota no encontrada' });
    }

    res.status(200).json({ message: 'Mascota eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la mascota:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};


const editarMascota = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion} = req.body;

    try {
        const [result] = await db.query('UPDATE Mascota SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Mascota no encontrada' });
        }
        res.status(200).json({ message: 'Mascota actualizada correctamente' });
    } catch (error) {
        console.error('Error al actualizar la mascota:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const obtenerMascotasPorDueno = async (req, res) => {
    const { id_dueno } = req.params;
    console.log("🔍 Buscando mascotas del dueño:", id_dueno); 

    try {
        const [mascotas] = await db.query('SELECT * FROM Mascota WHERE id_dueno = ?', [id_dueno]);
        res.status(200).json(mascotas);
    } catch (error) {
        console.error('Error al obtener las mascotas del dueño:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};



module.exports = {
    crearMascota,
    obtenerMascotas,
    obtenerMascotaPorId,
    eliminarMascota,
    editarMascota,
    obtenerMascotasPorDueno
};