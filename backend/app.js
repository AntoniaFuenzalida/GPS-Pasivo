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

app.use('/api', userRoutes);      
app.use('/api/mascotas', mascotaRoutes);  
app.use('/api', localizacionRoutes); 

module.exports = app;
