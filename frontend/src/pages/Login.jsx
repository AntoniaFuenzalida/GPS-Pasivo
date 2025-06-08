import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getMe } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Login → obtener token
      const { token } = await loginUser({ correo: email, contrasena: password });

      // 2. Guardar token en localStorage
      localStorage.setItem("token", token);

      // 3. Obtener datos del usuario logueado
      const usuario = await getMe(token);
      console.log("👤 Usuario logueado:", usuario);

      // (Opcional) Guardarlo en estado global / contexto / localStorage:
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // 4. Redirigir al dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Error de login:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 animate-fadeIn">
        <div className="text-center mb-6">
          <Link to="/" className="text-2xl font-bold text-red-600 flex items-center justify-center gap-2">
            🐾 MascotasID
          </Link>
          <h1 className="text-3xl font-extrabold mt-4">Iniciar Sesión</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Mostrar error si hay */}
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          {/* Botón */}
          <div>
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Iniciar Sesión
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm">
            ¿No tienes una cuenta?{" "}
            <Link to="/register" className="text-red-600 hover:underline">
              Regístrate
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
