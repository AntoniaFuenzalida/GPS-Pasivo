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
    // Nota: no incluimos imagenUrl directamente en form, lo manejamos aparte
  });

  const [imagenFile, setImagenFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // Cuando cambie la mascota a editar, actualizamos el estado del formulario y la imagen
  useEffect(() => {
    if (mascota) {
      // Rellena campos del formulario
      setForm({
        nombre: mascota.nombre || "",
        tipo: mascota.tipo || "",
        raza: mascota.raza || "",
        edad: mascota.edad || "",
        alergias: mascota.alergias || "",
      });

      // Si la mascota ya tiene una URL de imagen (mascota.imagenUrl), úsala como preview
      if (mascota.imagenUrl) {
        setPreviewUrl(mascota.imagenUrl);
      } else {
        setPreviewUrl("");
      }

      // Limpiar posible imagen nueva seleccionada
      setImagenFile(null);
    } else {
      // Modal de "añadir nueva mascota": campos vacíos
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
      setPreviewUrl("");
      setImagenFile(null);
    }
  }, [mascota]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Cuando el usuario selecciona un archivo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagenFile(file);

      // Generar URL de previsualización
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Llamamos a onSave pasando todos los datos del formulario
    // incluimos imagenFile en form.imagenFile para que onSave lo reciba
    onSave({ ...form, imagenFile }, mascota?.index);
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
          {/* SECCIÓN: Nombre, Tipo, Raza, Edad */}
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

          {/* SECCIÓN: Alergias/Información Médica */}
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
            {/* Previsualización de la imagen seleccionada o existente */}
            {previewUrl && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Previsualización:</p>
                <img
                  src={previewUrl}
                  alt="Previsualización de mascota"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
              </div>
            )}
          </div>

          {/* BOTÓN DE SUBMIT */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              {mascota
                ? "Guardar Cambios"
                : "Registrar Mascota y Generar Código QR"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrEditPetModal;
