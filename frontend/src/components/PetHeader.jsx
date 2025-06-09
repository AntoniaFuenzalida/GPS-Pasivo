import React from "react";

const PetHeader = ({ fotoUrl, nombre, descripcion}) => (
  <div className="relative h-48 bg-gray-200">
    {fotoUrl ? (
      <img
        src={fotoUrl}
        alt={nombre}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-gray-400">
        Sin foto disponible
      </div>
    )}
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
      <h1 className="text-2xl font-bold text-white">{nombre}</h1>
      <p className="text-sm text-gray-200">
        {descripcion ? descripcion : "No hay descripción disponible"}
      </p>
    </div>
  </div>
);

export default PetHeader;
