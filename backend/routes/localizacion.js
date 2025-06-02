const express = require('express');
const router = express.Router();

const {
    obtenerLocalizaciones,
    obtenerLocalizacionesPorDueno,
    obtenerLocalizacionesPorMascota,
    crearLocalizacion,
    eliminarLocalizacion,
} = require('../controllers/localizacionController');

// Rutas con prefijo relativo "/localizaciones"
router.get('/localizaciones/obtener', obtenerLocalizaciones);
router.get('/localizaciones/dueno/:id_dueno', obtenerLocalizacionesPorDueno);
router.get('/localizaciones/mascota/:id_mascota', obtenerLocalizacionesPorMascota);
router.post('/localizaciones/crear', crearLocalizacion);
router.delete('/localizaciones/eliminar/:id', eliminarLocalizacion);

module.exports = router;