import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Register = () => {
  // Debug: verificar qué URL se está usando
  console.log("🔍 API_URL:", API_URL);
  console.log("🔍 REACT_APP_API_URL:", process.env.REACT_APP_API_URL);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirm) {
    alert("Las contraseñas no coinciden.");
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/register`, {
      nombre: fullName,
      correo: email,
      contrasena: password,
    });

    console.log("✅ Registro exitoso:", response.data);
    alert("¡Usuario registrado exitosamente!");
    navigate("/login");

  } catch (error) {
    console.error("❌ Error al registrar:", error.response?.data || error.message);
    alert(error.response?.data?.error || "Ocurrió un error al registrar");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
        {/* Logo y título */}
        <div className="text-center mb-6">
          <Link to="/" className="text-2xl font-bold text-red-600 flex items-center justify-center gap-2">
            🐾 MascotasID
          </Link>
          <h1 className="text-3xl font-extrabold mt-4">Crear una Cuenta</h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nombre Completo */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Juan Pérez"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@ejemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <input
              id="confirm"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          {/* Botón Registrarse */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Registrarse
            </button>
          </div>

          {/* Enlace a Login */}
          <p className="text-center text-gray-600 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-red-600 hover:underline">
              Iniciar Sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
