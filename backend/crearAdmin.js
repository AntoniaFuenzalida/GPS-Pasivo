// Para crear un admin hay que cambiar los datos y ejecutar desde el backen este archivo con node crearAdmin.js
const bcrypt = require("bcrypt");
const db = require("./db");
async function crearAdmin() {
  const nombre = "Admin Principal";
  const correo = "admin@hotmail.com";
  const contrasena = "123";
  const tipo = "administrador";
  const telefono = null;

  try {
    
    const [existente] = await db.query("SELECT id FROM Usuario WHERE correo = ?", [correo]);
    if (existente.length > 0) {
      console.log("⚠️ Ya existe un usuario con ese correo.");
      return;
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const [result] = await db.query(
      `INSERT INTO Usuario (nombre, correo, contrasena, tipo, telefono)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, correo, hash, tipo, telefono]
    );

    console.log("✅ Administrador creado con ID:", result.insertId);
  } catch (err) {
    console.error("❌ Error al crear el admin:", err);
  } finally {
    process.exit();
  }
}

crearAdmin();
