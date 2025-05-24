const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/usuarios');
const mascotaRoutes = require('./routes/mascotas');

app.use('/api', userRoutes);
app.use('/api', mascotaRoutes);


module.exports = app;