import React, { useEffect, useState } from "react";

const AddOrEditPetModal = ({ visible, onClose, mascota, onSave }) => {
  const [form, setForm] = useState({
    nombre: "",
    tipo: "",
    raza: "",
    edad: "",
    alergias: "",
    ubicacion: "",
    telefonoPrincipal: "",
    telefonoSecundario: "",
  });

  // Cuando cambie la mascota a editar, actualizamos el estado del formulario
  useEffect(() => {
    if (mascota) {
      setForm({ ...mascota });
    } else {
      setForm({
        nombre: "",
        tipo: "",
        raza: "",
        edad: "",
        alergias: "",
        ubicacion: "",
        telefonoPrincipal: "",
        telefonoSecundario: "",
      });
    }
  }, [mascota]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form, mascota?.index);
  };

  // No renderizamos nada si visible = false
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-[9999] overflow-auto"
      onClick={onClose} // Cerrar modal si clicas afuera del contenido
    >
      <div
        className="relative bg-white text-gray-900 rounded-lg p-6 w-full max-w-3xl shadow-xl animate-fadeIn"
        onClick={(e) => e.stopPropagation()} // No cerrar modal si clicas dentro del contenido
      >
        {/* Botón “X” para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-1">
          {mascota ? "Editar Mascota" : "Añadir una Nueva Mascota"}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Ingresa la información de tu mascota para generar un código QR único
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Nombre de la Mascota
              </label>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de Mascota
              </label>
              <select
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Seleccionar tipo</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="Ave">Ave</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Raza</label>
              <input
                name="raza"
                value={form.raza}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Edad</label>
              <input
                name="edad"
                value={form.edad}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Alergias/Información Médica
            </label>
            <textarea
              name="alergias"
              value={form.alergias}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Referencia de Ubicación
            </label>
            <input
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Teléfono de Contacto Principal
              </label>
              <input
                name="telefonoPrincipal"
                value={form.telefonoPrincipal}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Teléfono de Contacto Secundario (Opcional)
              </label>
              <input
                name="telefonoSecundario"
                value={form.telefonoSecundario}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="pt-4 text-center">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              {mascota ? "Guardar Cambios" : "Registrar Mascota y Generar Código QR"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditPetModal;
//holi