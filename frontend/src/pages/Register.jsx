import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contrasena: "",
    confirmar: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.contrasena !== formData.confirmar) {
      setError("Las contrasenas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.nombre,
          correo: formData.correo,
          contrasena: formData.contrasena,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Usuario registrado correctamente");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.error || "Error en el registro");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-2">Crear una cuenta</h2>
        <p className="text-sm text-gray-600 mb-6">
          Regístrate para gestionar la información de identificación de tu mascota
        </p>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nombre Completo</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Juan Pérez"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="juan@ejemplo.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirmar Contraseña</label>
            <input
              type="password"
              name="confirmar"
              value={formData.confirmar}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Registrarse
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-red-600 font-medium hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
