import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 scroll-smooth">
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow fixed top-0 w-full z-50">
        <div className="text-xl font-bold text-red-600">🐾 MascotasID</div>
        <ul className="flex space-x-6 font-medium text-gray-700">
          <li><a href="#inicio" className="hover:text-red-600">Inicio</a></li>
          <li><a href="#caracteristicas" className="hover:text-red-600">Características</a></li>
          <li><a href="#funciona" className="hover:text-red-600">Cómo Funciona</a></li>
        </ul>
        <div className="space-x-2">
          <button className="border border-red-600 text-red-600 px-4 py-1 rounded hover:bg-red-50">Iniciar Sesión</button>
          <button className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700">Registrarse</button>
        </div>
      </nav>

      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};

export default Landing;
