import React from "react";

const Landing = () => {
  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 scroll-smooth">
      {/* Navbar */}
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

      {/* Hero */}
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

      {/* Características */}
      <section id="caracteristicas" className="bg-white py-20 px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Características Principales</h2>
          <p className="text-gray-600">Nuestro sistema está diseñado para ser simple, efectivo y centrado en la privacidad</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: "📱",
              title: "Escaneo Universal",
              text: "Los códigos QR pueden ser escaneados por cualquier smartphone sin necesidad de aplicaciones adicionales."
            },
            {
              icon: "🛡️",
              title: "Protección de Privacidad",
              text: "Solo se muestra información esencial para proteger tu privacidad."
            },
            {
              icon: "👤",
              title: "Gestión Sencilla",
              text: "Panel de control simple para gestionar la información de tus mascotas y seguir los escaneos."
            }
          ].map(({ icon, title, text }, idx) => (
            <div key={idx} className="bg-gray-100 rounded border border-gray-300 p-6 text-center">
              <div className="text-4xl mb-4">{icon}</div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo Funciona */}
      <section id="funciona" className="bg-gray-100 py-20 px-8">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Cómo Funciona</h2>
          <p className="text-gray-600">Un proceso simple para mantener a tus mascotas seguras</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              step: "1",
              title: "Regístrate",
              text: "Crea una cuenta y registra la información de tu mascota"
            },
            {
              step: "2",
              title: "Obtén tu Código QR",
              text: "Recibe un código QR único para colocar en el collar de tu mascota"
            },
            {
              step: "3",
              title: "Mantente Protegido",
              text: "Si tu mascota se pierde, cualquier persona puede escanear el código QR para ver tu información de contacto"
            }
          ].map(({ step, title, text }, idx) => (
            <div key={idx} className="text-center">
              <div className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center mx-auto mb-4">
                {step}
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Landing;
