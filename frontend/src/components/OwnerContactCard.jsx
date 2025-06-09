import React from "react";
import { FiPhone, FiMail, FiMessageSquare } from "react-icons/fi";

const OwnerContactCard = ({ contacto }) => {
  const { nombreDueno, telefono, correo} = contacto;

  // Función auxiliar para asegurar que telefono sea un string
  const formatTelefono = (tel) => {
    if (tel === null || tel === undefined) return "";
    return String(tel); // Convertir a string
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm animate-fadeIn">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">
        Contacto del Dueño
      </h2>
      <p className="text-gray-700 mb-4">{nombreDueno}</p>

      <div className="space-y-2">
        {/* Botón Llamar */}
        {telefono && (
          <a
            href={`tel:${formatTelefono(telefono)}`}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
          >
            <FiPhone className="text-lg" /> {formatTelefono(telefono)}
          </a>
        )}

        {/* Botón Correo */}
        {correo && (
          <a
            href={`mailto:${correo}`}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition"
          >
            <FiMail className="text-lg" /> {correo}
          </a>
        )}

        {/* Botón WhatsApp */}
        {telefono && (
          <a
            href={`https://wa.me/${formatTelefono(telefono).replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition"
          >
            <FiMessageSquare className="text-lg" /> WhatsApp
          </a>
        )}
      </div>
    </div>
  );
};

export default OwnerContactCard;
