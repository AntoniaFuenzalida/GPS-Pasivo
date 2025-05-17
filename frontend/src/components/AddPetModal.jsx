import React from "react";

const AddPetModal = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-3xl shadow-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">
          ×
        </button>
        <h2 className="text-xl font-bold mb-2">Añadir una Nueva Mascota</h2>
        <p className="text-sm text-gray-600 mb-6">Ingresa la información de tu mascota para generar un código QR único</p>

        <form className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de la Mascota</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo de Mascota</label>
            <select className="w-full border border-gray-300 rounded px-3 py-2">
              <option>Seleccionar tipo</option>
              <option>Perro</option>
              <option>Gato</option>
              <option>Otro</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Raza</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Edad</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Alergias / Información Médica</label>
            <textarea className="w-full border border-gray-300 rounded px-3 py-2" rows="2" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Referencia de Ubicación</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono de Contacto Principal</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Teléfono de Contacto Secundario (Opcional)</label>
            <input className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="md:col-span-2 pt-4">
            <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
              Registrar Mascota y Generar Código QR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetModal;
