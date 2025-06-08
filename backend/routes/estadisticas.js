const express = require("express");
const router = express.Router();
const { obtenerTotales } = require("../controllers/estadisticasController");

router.get("/totales", obtenerTotales);


module.exports = router;
