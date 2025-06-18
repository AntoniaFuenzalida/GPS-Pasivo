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
router.get('/obtener', obtenerLocalizaciones);
router.get('/dueno/:id_dueno', obtenerLocalizacionesPorDueno);
router.get('/mascota/:id_mascota', obtenerLocalizacionesPorMascota);
router.post('/crear', crearLocalizacion);
router.delete('/eliminar/:id', eliminarLocalizacion);

module.exports = router;