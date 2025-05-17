import React from "react";

const Features = () => {
  const features = [
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
  ];

  return (
    <section id="caracteristicas" className="bg-white py-20 px-8">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Características Principales</h2>
        <p className="text-gray-600">Nuestro sistema está diseñado para ser simple, efectivo y centrado en la privacidad</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map(({ icon, title, text }, idx) => (
          <div key={idx} className="bg-gray-100 rounded border border-gray-300 p-6 text-center">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
