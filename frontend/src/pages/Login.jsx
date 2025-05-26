import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: "",
    contrasena: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          correo: formData.correo,
          contrasena: formData.contrasena,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); 
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-2">Iniciar Sesión</h2>
        <p className="text-sm text-gray-600 mb-6">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Correo Electrónico</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              required
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
              required
            />
          </div>

          <div className="text-sm text-gray-500">
            Mostrar usuarios de prueba
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-red-600 font-medium hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
