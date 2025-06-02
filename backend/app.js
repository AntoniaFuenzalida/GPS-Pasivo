// app.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
const userRoutes = require('./routes/usuarios');
const mascotaRoutes = require('./routes/mascotas');
const localizacionRoutes = require('./routes/localizacion');

app.use('/api', userRoutes);      // por ejemplo: /api/usuarios/login
app.use('/api', mascotaRoutes);   // por ejemplo: /api/mascotas/dueno/:id_dueno
app.use('/api', localizacionRoutes); // por ejemplo: /api/localizaciones/obtener

module.exports = app;
