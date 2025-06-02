import React, { useState } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { PiPawPrintFill } from "react-icons/pi";

const datosIniciales = [
  {
    nombre: "Juan Pérez",
    correo: "usuario@ejemplo.com",
    mascotas: 2,
    estado: "Activo",
    fecha: "15/1/2025",
  },
  {
    nombre: "María González",
    correo: "maria@ejemplo.com",
    mascotas: 1,
    estado: "Activo",
    fecha: "20/2/2025",
  },
  {
    nombre: "Roberto Jiménez",
    correo: "roberto@ejemplo.com",
    mascotas: 3,
    estado: "Inactivo",
    fecha: "10/3/2025",
  },
  {
    nombre: "Ana Martínez",
    correo: "ana@ejemplo.com",
    mascotas: 1,
    estado: "Activo",
    fecha: "5/4/2025",
  },
  {
    nombre: "Carlos Wilson",
    correo: "carlos@ejemplo.com",
    mascotas: 0,
    estado: "Pendiente",
    fecha: "25/4/2025",
  },
];

const badgeStyle = {
  Activo: "bg-green-100 text-green-800",
  Inactivo: "bg-red-100 text-red-800",
  Pendiente: "bg-yellow-100 text-yellow-800",
};

const AdminUsuarios = () => {
  const [usuarios,] = useState(datosIniciales);
  const [busqueda, setBusqueda] = useState("");

  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.correo} ${u.estado}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-8 py-10">
      {/* Encabezado */}
      <div className="mb-8 animate-fadeIn">
        <h1 className="text-3xl font-extrabold">Usuarios</h1>
        <p className="text-gray-600 mt-1">
          Gestionar cuentas de usuario en el sistema
        </p>
      </div>

      {/* Buscador */}
      <div className="mb-6 relative max-w-md animate-fadeIn">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, correo o estado..."
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
                Correo
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Mascotas
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                Registrado
              </th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((u, i) => (
              <tr
                key={i}
                className="border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">
                  {u.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {u.correo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {u.mascotas}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle[u.estado]}`}
                  >
                    {u.estado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {u.fecha}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                    title="Editar"
                  >
                    <FiEdit2 className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
                    title="Ver mascotas"
                  >
                    <PiPawPrintFill className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-red-100 transition text-red-600"
                    title="Eliminar"
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

export default AdminUsuarios;
