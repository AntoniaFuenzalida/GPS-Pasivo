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

// Rutas con prefijo relativo "/mascotas"
router.post('/mascotas/crear', crearMascota);
router.get('/mascotas/obtener', obtenerMascotas);
router.get('/mascotas/obtener/:id', obtenerMascotaPorId);
router.delete('/mascotas/eliminar/:id', eliminarMascota);
router.put('/mascotas/editar/:id', editarMascota);
router.get('/mascotas/dueno/:id_dueno', obtenerMascotasPorDueno); 
router.get('/mascotas/comentarios/:id_mascota', obtenerComentariosPorMascota);
router.get('/mascotas/ubicacion/:id_mascota', obtenerUltimaUbicacionPorMascota);


module.exports = router;
