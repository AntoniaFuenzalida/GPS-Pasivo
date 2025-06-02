// routes/mascotas.js
const express = require('express');
const router = express.Router();

const {
  crearMascota,
  obtenerMascotas,
  obtenerMascotaPorId,
  eliminarMascota,
  editarMascota,
  obtenerMascotasPorDueno
} = require('../controllers/mascotaController');

// Rutas con prefijo relativo "/mascotas"
router.post('/mascotas/crear', crearMascota);
router.get('/mascotas/obtener', obtenerMascotas);
router.get('/mascotas/obtener/:id', obtenerMascotaPorId);
router.delete('/mascotas/eliminar/:id', eliminarMascota);
router.put('/mascotas/editar/:id', editarMascota);
router.get('/mascotas/dueno/:id_dueno', obtenerMascotasPorDueno); 

module.exports = router;
