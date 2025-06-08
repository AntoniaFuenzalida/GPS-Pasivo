import React from "react";

const PetMedicalInfo = ({ alergias }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-fadeIn">
    <h2 className="text-lg font-semibold text-red-700 mb-1">
      Información Médica
    </h2>
    <p className="text-gray-700 text-sm">
      {alergias || "No se registraron alergias."}
    </p>
  </div>
);

export default PetMedicalInfo;
