// routes/mascotas.js
const express = require('express');
const router = express.Router();

const {
  crearMascota,
  obtenerMascotas,
  obtenerMascotaPorId,
  eliminarMascota,
  editarMascota,
  obtenerMascotasPorDueno,
  obtenerComentariosPorMascota,
  obtenerUltimaUbicacionPorMascota
} = require('../controllers/mascotaController');

// Rutas principales (ya tienen el prefijo /api/mascotas desde app.js)
router.post('/crear', crearMascota);
router.get('/obtener', obtenerMascotas);
router.get('/obtener/:id', obtenerMascotaPorId);
router.delete('/eliminar/:id', eliminarMascota);
router.put('/editar/:id', editarMascota);
router.get('/dueno/:id_dueno', obtenerMascotasPorDueno);
router.get('/comentarios/:id_mascota', obtenerComentariosPorMascota);
router.get('/ubicacion/:id_mascota', obtenerUltimaUbicacionPorMascota);

module.exports = router;
