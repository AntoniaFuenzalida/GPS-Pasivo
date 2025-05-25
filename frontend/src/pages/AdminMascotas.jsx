import React from "react";
import { FiMessageSquare } from "react-icons/fi";

const escaneos = [
  {
    mascota: "Max",
    dueno: "Juan Pérez",
    fecha: "27/4/2025, 6:15:00",
    ubicacion: "Aproximado: Parque Central",
    estado: "Notificado",
    comentario: "Sí",
  },
  {
    mascota: "Max",
    dueno: "Juan Pérez",
    fecha: "25/4/2025, 10:30:00",
    ubicacion: "Aproximado: Calle Principal",
    estado: "Notificado",
    comentario: "No",
  },
  {
    mascota: "Luna",
    dueno: "María González",
    fecha: "26/4/2025, 5:15:00",
    ubicacion: "Aproximado: Avenida Roble",
    estado: "Notificado",
    comentario: "Sí",
  },
  {
    mascota: "Buddy",
    dueno: "Roberto Jiménez",
    fecha: "24/4/2025, 12:45:00",
    ubicacion: "Aproximado: Parque Central",
    estado: "Nuevo",
    comentario: "No",
  },
  {
    mascota: "Max",
    dueno: "Juan Pérez",
    fecha: "23/4/2025, 7:20:00",
    ubicacion: "Aproximado: Calle Pino",
    estado: "Notificado",
    comentario: "Sí",
  },
  {
    mascota: "Luna",
    dueno: "María González",
    fecha: "22/4/2025, 9:10:00",
    ubicacion: "Aproximado: Calle Maple",
    estado: "Notificado",
    comentario: "Sí",
  },
];

const badgeStyle = {
  Notificado: "bg-gray-200 text-gray-800",
  Nuevo: "bg-blue-100 text-blue-800",
};

const AdminEscaneos = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-8 py-10">
      <h1 className="text-3xl font-bold mb-1">Panel de Administración</h1>
      <p className="text-gray-500 mb-6">
        Gestiona usuarios, mascotas y visualiza estadísticas del sistema
      </p>

      <div className="bg-white border border-gray-300 rounded-lg p-6 shadow">
        <h2 className="text-xl font-bold mb-2">Todos los Escaneos</h2>
        <p className="text-sm text-gray-500 mb-4">
          Historial completo de escaneos de códigos QR en el sistema
        </p>

        <input
          type="text"
          placeholder="Buscar por mascota, dueño, ubicación o comentario..."
          className="w-full mb-4 px-4 py-2 rounded border border-gray-300 bg-white text-sm"
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-sm text-gray-600">
                <th className="px-3 py-2">Mascota</th>
                <th className="px-3 py-2">Dueño</th>
                <th className="px-3 py-2">Fecha y Hora</th>
                <th className="px-3 py-2">Ubicación</th>
                <th className="px-3 py-2">Estado</th>
                <th className="px-3 py-2">Comentario</th>
              </tr>
            </thead>
            <tbody>
              {escaneos.map((e, i) => (
                <tr key={i} className="bg-white hover:bg-gray-50 transition rounded">
                  <td className="px-3 py-2 font-medium">{e.mascota}</td>
                  <td className="px-3 py-2">{e.dueno}</td>
                  <td className="px-3 py-2">{e.fecha}</td>
                  <td className="px-3 py-2">{e.ubicacion}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${badgeStyle[e.estado]}`}
                    >
                      {e.estado}
                    </span>
                  </td>
                  <td className="px-3 py-2 flex items-center gap-2 text-sm">
                    <FiMessageSquare />
                    {e.comentario === "Sí" ? (
                      <button className="text-blue-600 hover:underline">Ver</button>
                    ) : (
                      <span className="text-gray-500">Sin comentario</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEscaneos;
