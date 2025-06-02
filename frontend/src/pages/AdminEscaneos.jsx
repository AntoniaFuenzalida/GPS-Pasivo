import React, { useState } from "react";
import { FiSearch, FiMessageSquare } from "react-icons/fi";

const escaneosIniciales = [
  {
    mascota: "Max",
    dueno: "Juan Pérez",
    fecha: "27/4/2025, 6:15:00",
    ubicacion: "Parque Central",
    estado: "Notificado",
    comentario: "Max fue encontrado corriendo sin correa en el parque.",
  },
  {
    mascota: "Max",
    dueno: "Juan Pérez",
    fecha: "25/4/2025, 10:30:00",
    ubicacion: "Calle Principal",
    estado: "Notificado",
    comentario: "",
  },
  {
    mascota: "Luna",
    dueno: "María González",
    fecha: "26/4/2025, 5:15:00",
    ubicacion: "Avenida Roble",
    estado: "Notificado",
    comentario: "Estaba cerca de los arbustos, parecía asustada.",
  },
  {
    mascota: "Buddy",
    dueno: "Roberto Jiménez",
    fecha: "24/4/2025, 12:45:00",
    ubicacion: "Parque Central",
    estado: "Nuevo",
    comentario: "",
  },
  {
    mascota: "Max",
    dueno: "Juan Pérez",
    fecha: "23/4/2025, 7:20:00",
    ubicacion: "Calle Pino",
    estado: "Notificado",
    comentario: "Todo en orden.",
  },
  {
    mascota: "Luna",
    dueno: "María González",
    fecha: "22/4/2025, 9:10:00",
    ubicacion: "Calle Maple",
    estado: "Notificado",
    comentario: "",
  },
  {
    mascota: "Buddy",
    dueno: "Roberto Jiménez",
    fecha: "21/4/2025, 11:30:00",
    ubicacion: "Calle Olmo",
    estado: "Notificado",
    comentario: "Estaba suelto pero tranquilo.",
  },
];

const badgeStyle = {
  Notificado: "bg-green-100 text-green-800",
  Nuevo: "bg-blue-100 text-blue-800",
};

const AdminEscaneos = () => {
  const [escaneos, setEscaneos] = useState(escaneosIniciales);
  const [busqueda, setBusqueda] = useState("");
  const [comentarioActivo, setComentarioActivo] = useState(null);

  const handleNotificar = (index) => {
    const nuevos = [...escaneos];
    nuevos[index].estado = "Notificado";
    setEscaneos(nuevos);
  };

  const escaneosFiltrados = escaneos.filter((e) =>
    `${e.mascota} ${e.dueno} ${e.ubicacion} ${e.comentario}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-8 py-10">
      {/* Encabezado */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-3xl font-extrabold">Todos los Escaneos</h1>
        <p className="text-gray-600 mt-1">
          Historial completo de escaneos de códigos QR en el sistema
        </p>
      </div>

      {/* Buscador */}
      <div className="mb-6 relative max-w-md animate-fadeIn">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por mascota, dueño, ubicación o comentario..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Tabla estilizada */}
      <div className="overflow-x-auto animate-fadeIn">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Mascota
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Dueño
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Fecha y Hora
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Ubicación
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Comentario
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {escaneosFiltrados.map((e, i) => (
              <tr
                key={i}
                className="border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                  {e.mascota}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {e.dueno}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {e.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  Aproximado: {e.ubicacion}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle[e.estado]}`}
                  >
                    {e.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center gap-2">
                  <FiMessageSquare className="text-gray-500" />
                  {e.comentario ? (
                    <button
                      className="text-blue-600 hover:underline"
                      onClick={() => setComentarioActivo(e.comentario)}
                    >
                      Ver
                    </button>
                  ) : (
                    <span className="text-gray-400">Sin comentario</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {e.estado === "Nuevo" && (
                    <button
                      onClick={() => handleNotificar(i)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition"
                    >
                      Marcar como Notificado
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de comentario */}
      {comentarioActivo && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-2xl relative animate-fadeIn">
            <button
              onClick={() => setComentarioActivo(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-2">Comentario del Escaneo</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{comentarioActivo}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEscaneos;
