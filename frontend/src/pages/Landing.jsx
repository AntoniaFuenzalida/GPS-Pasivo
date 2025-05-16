import React from "react";

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="text-xl font-bold text-red-600">🐾 MascotasID</div>
        <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
          <li className="hover:text-red-600 cursor-pointer">Inicio</li>
          <li className="hover:text-red-600 cursor-pointer">Características</li>
          <li className="hover:text-red-600 cursor-pointer">Cómo Funciona</li>
        </ul>
        <div className="space-x-2">
          <button className="border border-red-600 text-red-600 px-4 py-1 rounded hover:bg-red-50">
            Iniciar Sesión
          </button>
          <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">
            Registrarse
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 max-w-7xl mx-auto">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight">
            Protege a tus mascotas con{" "}
            <span className="text-red-600">identificación QR inteligente</span>
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            Nuestro sistema de identificación para mascotas utiliza códigos QR únicos
            que pueden ser escaneados por cualquier smartphone. No se requiere ninguna
            aplicación especial.
          </p>
          <div className="space-x-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              Registra tu Mascota →
            </button>
            <button className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-200">
              Saber Más
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="bg-gray-200 w-80 h-80 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Imagen o animación aquí
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
