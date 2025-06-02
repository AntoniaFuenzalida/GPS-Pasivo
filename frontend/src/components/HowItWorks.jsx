import React from "react";

const HowItWorks = () => {
  const steps = [
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
  ];

  return (
    <section id="funciona" className="bg-gray-100 py-20 px-8">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-4">Cómo Funciona</h2>
        <p className="text-gray-600">Un proceso simple para mantener a tus mascotas seguras</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {steps.map(({ step, title, text }, idx) => (
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
  );
};

export default HowItWorks;
