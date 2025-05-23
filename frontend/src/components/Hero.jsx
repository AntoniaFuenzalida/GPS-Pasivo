import React from "react";

const Hero = () => {
  return (
    <section id="inicio" className="pt-32 px-8 pb-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
      <div className="md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Protege a tus mascotas con <span className="text-red-600">identificación QR inteligente</span>
        </h1>
        <p className="text-gray-700 mb-8 text-lg">
          Nuestro sistema de identificación para mascotas utiliza códigos QR únicos que pueden ser escaneados por cualquier smartphone. No se requiere ninguna aplicación especial.
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
  );
};

export default Hero;
