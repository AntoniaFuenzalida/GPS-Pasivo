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

router.get('/dueno/:id_dueno', obtenerMascotasPorDueno);
router.post('/crear', crearMascota);
router.get('/obtener', obtenerMascotas);
router.get('/obtener/:id', obtenerMascotaPorId);
router.delete('/eliminar/:id', eliminarMascota);
router.put('/editar/:id', editarMascota);


module.exports = router;
