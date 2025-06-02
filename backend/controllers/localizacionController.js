const db = require('../db');

const obtenerLocalizaciones = async (req, res) => {
    try {
        let [localizaciones] = [];
        [localizaciones] = await db.query('SELECT * FROM Localizacion');

        res.status(201).json({localizaciones: [localizaciones]})
    } catch (error) {
        console.error('Error al encontrar todas las localizaciones')
        res.status(500).json({error: 'Error interno en el servidor al obtener localizaciones'})
    }
}

const obtenerLocalizacionesPorDueno = async (req, res) => {
    const {id_dueno} = req.params;
    if (!id_dueno){
        return res.status(400).json({ error: 'El id_dueno no encontrado'})
    }
    try {
        let [localizaciones] = [];
        [localizaciones] = await db.query('SELECT nombre, mascota_id, latitud, longitud, fecha FROM Mascota INNER JOIN Localizacion WHERE id_dueno = ?', [id_dueno])
        if (localizaciones.lenght === 0){
            return res.status(200).json({localizaciones: [localizaciones]});
        }

        res.status(200).json({localizaciones: [localizaciones]});

    } catch (error) {
        console.error('Error al encontrar las localizaciones por dueno');
        res.status(500).json({error: 'Error interno en el servidor al encontrar localizaciobnes por dueno'})
    }
}

const obtenerLocalizacionesPorMascota = async (req, res) => {
    const {id_mascota} = req.params;
    if (!id_mascota){
        return res.status(400).json({ error: 'El id_mascota no encontrado'})
    }
    try {
        let [localizaciones] = [];
        [localizaciones] = await db.query('SELECT nombre, mascota_id, latitud, longitud, fecha FROM Mascota INNER JOIN Localizacion WHERE mascota_id = ?', [id_mascota])
        if (localizaciones.lenght === 0){
            return res.status(200).json({localizaciones: [localizaciones]});
        }

        res.status(200).json({localizaciones: [localizaciones]});

    } catch (error) {
        console.error('Error al encontrar las localizaciones por mascota');
        res.status(500).json({error: 'Error interno en el servidor al encontrar localizaciobnes por mascota'})
    }
}

const crearLocalizacion = async (req, res) => {
    const { mascota_id, latitud, longitud} = req.body;

    if (!mascota_id || !latitud || !longitud) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        const fecha = new Date();
        const [result] = await db.query('INSERT INTO Localizacion (mascota_id, latitud, longitud, fecha) VALUES (?, ?, ?, ?)', 
            [mascota_id, latitud, longitud, fecha]);
        
        res.status(201).json({ message: 'Localización creada correctamente', id: result.insertId });
    } catch (error) {
        console.error('Error al crear la localización:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

const eliminarLocalizacion = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'El id de la localización es requerido' });
    }

    try {
        const [result] = await db.query('DELETE FROM Localizacion WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Localización no encontrada' });
        }

        res.status(200).json({ message: 'Localización eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la localización:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
    

module.exports = {
    obtenerLocalizaciones,
    obtenerLocalizacionesPorDueno,
    obtenerLocalizacionesPorMascota,
    crearLocalizacion,
    eliminarLocalizacion,
}