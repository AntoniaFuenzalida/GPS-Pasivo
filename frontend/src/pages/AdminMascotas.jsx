import React, { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { BiQrScan } from "react-icons/bi";

const datosIniciales = [
  {
    nombre: "Max",
    tipo: "Perro",
    raza: "Golden Retriever",
    dueno: "Juan Pérez",
    fechaRegistro: "01/02/2025",
  },
  {
    nombre: "Luna",
    tipo: "Gato",
    raza: "Siamés",
    dueno: "María González",
    fechaRegistro: "15/03/2025",
  },
  {
    nombre: "Buddy",
    tipo: "Perro",
    raza: "Labrador",
    dueno: "Roberto Jiménez",
    fechaRegistro: "20/04/2025",
  },
  {
    nombre: "Molly",
    tipo: "Ave",
    raza: "Canario",
    dueno: "Ana Martínez",
    fechaRegistro: "05/05/2025",
  },
  {
    nombre: "Rocky",
    tipo: "Perro",
    raza: "Bulldog",
    dueno: "Carlos Wilson",
    fechaRegistro: "12/05/2025",
  },
];

const AdminMascotas = () => {
  const [mascotas, setMascotas] = useState(datosIniciales);
  const [busqueda, setBusqueda] = useState("");

  const mascotasFiltradas = mascotas.filter((m) =>
    `${m.nombre} ${m.tipo} ${m.raza} ${m.dueno}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const handleEliminar = (index) => {
    setMascotas((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-8 py-10">
      {/* Encabezado */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-3xl font-extrabold">Mascotas</h1>
        <p className="text-gray-600 mt-1">
          Gestiona las mascotas registradas en el sistema
        </p>
      </div>

      {/* Buscador */}
      <div className="mb-6 relative max-w-md animate-fadeIn">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, tipo, raza o dueño..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
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
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Tipo
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Raza
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Dueño
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Fecha Registro
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {mascotasFiltradas.map((m, i) => (
              <tr
                key={i}
                className="border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                  {m.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {m.tipo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {m.raza}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {m.dueno}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {m.fechaRegistro}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                    title="Editar"
                  >
                    <FiEdit2 className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                    title="Ver QR"
                  >
                    <BiQrScan className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-red-100 transition text-red-600"
                    title="Eliminar"
                    onClick={() => handleEliminar(i)}
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminMascotas;
