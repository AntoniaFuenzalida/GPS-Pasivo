import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-900 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-2">Crear una cuenta</h2>
        <p className="text-sm text-gray-600 mb-6">
          Regístrate para gestionar la información de identificación de tu mascota
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Nombre Completo</label>
            <input
              type="text"
              placeholder="Juan Pérez"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Correo Electrónico</label>
            <input
              type="email"
              placeholder="juan@ejemplo.com"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Confirmar Contraseña</label>
            <input
              type="password"
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
