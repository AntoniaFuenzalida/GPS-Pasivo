const db = require('../db');

const crearMascota = async (req, res) => {
    const { nombre, descripcion, id_dueno } = req.body;

    console.log('Datos recibidos para crear mascota:', req.body);
    if (!nombre || !id_dueno) {
        return res.status(400).json({ error: 'Nombre e id_dueno son requeridos' });
    }

    try {
        const fecha_registro = new Date();
        const estado = 'monitoreada'; 


        // Verificar si el usuario existe
        const [usuarios] = await db.query('SELECT nombre FROM Usuario WHERE id = ?', [id_dueno]);
        if (usuarios.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        const nombre_dueno = usuarios[0].nombre;

        // Crear la mascota
        const [result] = await db.query(
            'INSERT INTO Mascota (nombre, descripcion, fecha_registro, estado, id_dueno, nombre_dueno) VALUES (?, ?, ?, ?, ?, ?)',
            [nombre, descripcion, fecha_registro, estado, id_dueno, nombre_dueno]
        );

        res.status(201).json({ id: result.insertId });
    } catch (error) {
        console.error('Error al crear la mascota:', error);
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
    try {
        const [mascotas] = await db.query('SELECT * FROM Mascota WHERE id_dueno = ?', [id_dueno]);
        
        if (mascotas.length == 0) {
            return res.status(404).json({ error: 'No se encontraron mascotas para este dueño' });
        }

        res.status(200).json(mascotas);
    } catch (error) {
        console.error('Error al obtener las mascotas del dueño:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    crearMascota,
    obtenerMascotas,
    obtenerMascotaPorId,
    eliminarMascota,
    editarMascota,
    obtenerMascotasPorDueno
};