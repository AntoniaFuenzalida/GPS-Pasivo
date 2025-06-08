const db = require("../db");

const obtenerTotales = async (req, res) => {
  try {
    const [[{ totalUsuarios }]] = await db.query('SELECT COUNT(*) AS totalUsuarios FROM Usuario');
    const [[{ totalMascotas }]] = await db.query('SELECT COUNT(*) AS totalMascotas FROM Mascota');
    const [[{ totalEscaneos }]] = await db.query('SELECT COUNT(*) AS totalEscaneos FROM Localizacion'); // o tu tabla real de escaneos

    res.json({ totalUsuarios, totalMascotas, totalEscaneos });
  } catch (err) {
    console.error("❌ Error en obtenerTotales:", err);
    res.status(500).json({ error: "Error al obtener estadísticas" });
  }
};

module.exports = { obtenerTotales };
