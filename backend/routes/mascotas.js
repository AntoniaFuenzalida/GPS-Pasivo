const express = require('express');
const router = express.Router();

const {
    crearMascota,
    obtenerMascotas,
    obtenerMascotaPorId,
    eliminarMascota
} = require('../controllers/mascotaController');

// Rutas públicas
router.post('/mascotas/crear', crearMascota);
router.get('/mascotas/obtener', obtenerMascotas);
router.get('/mascotas/obtener/:id', obtenerMascotaPorId);
router.delete('/mascotas/eliminar/:id', eliminarMascota);

module.exports = router;
