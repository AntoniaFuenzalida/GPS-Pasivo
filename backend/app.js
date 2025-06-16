// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const estadisticasRoutes = require('./routes/estadisticas');

app.use(cors());
app.use(express.json());
app.use('/api/estadisticas', estadisticasRoutes);


// Rutas
const userRoutes = require('./routes/usuarios');
const mascotaRoutes = require('./routes/mascotas');
const localizacionRoutes = require('./routes/localizacion');

app.use('/api', userRoutes);      
app.use('/api/mascotas', mascotaRoutes);  
app.use('/api/localizaciones', localizacionRoutes); 

module.exports = app;
