const express = require('express');
const router = express.Router();
const db = require('../db'); 

const {
  getUsers,
  registerUser,
  loginUser,
  updateUser,
  obtenerContacto,
  eliminarUsuario,
  cambiarContrasena
} = require('../controllers/usuariosController');

const verifyToken = require('../controllers/authMiddleware'); 
const bcrypt = require('bcrypt');



// Rutas públicas
router.get('/users', getUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/users/:id', eliminarUsuario);
router.get('/usuarios/contacto/:id', obtenerContacto);


// Rutas protegidas
router.put('/update', verifyToken, updateUser);

//Ruta apra obtener datos del usuario autenticado
router.get('/me', verifyToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, nombre, correo, tipo, estado, fecha FROM Usuario WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Error en /me:", err);
    res.status(500).json({ error: 'Error al obtener datos del usuario' });
  }
});



router.put('/cambiar-contrasena', verifyToken, cambiarContrasena);



module.exports = router;
