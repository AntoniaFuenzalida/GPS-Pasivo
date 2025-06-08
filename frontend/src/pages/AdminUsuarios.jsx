import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { PiPawPrintFill } from "react-icons/pi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 
const badgeStyle = {
  Activo: "bg-green-100 text-green-800",
  Inactivo: "bg-red-100 text-red-800",
  Pendiente: "bg-yellow-100 text-yellow-800",
};

const AdminUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");


const fetchUsuarios = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/users");
    setUsuarios(response.data);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
  }
};

useEffect(() => {
  fetchUsuarios();
}, []);


  const usuariosFiltrados = usuarios.filter((u) =>
    `${u.nombre} ${u.correo} ${u.estado || ""}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const handleEliminar = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/api/users/${id}`);
    setUsuarios(prev => prev.filter(u => u.id !== id));
    toast.success("Usuario eliminado correctamente");
  } catch (err) {
    toast.error(err?.response?.data?.error || "Error al eliminar usuario");
    console.error("Error al eliminar usuario:", err);
  }
};

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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Correo</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Mascotas</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Estado</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Registrado</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.map((u, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{u.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{u.correo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{u.mascotas || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyle[u.estado] || 'bg-gray-100 text-gray-700'}`}>
                    {u.estado || "Sin estado"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {u.fecha || "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition" title="Editar">
                    <FiEdit2 className="text-gray-600" />
                  </button>
                  <button className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition" title="Ver mascotas">
                    <PiPawPrintFill className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-red-100 transition text-red-600"
                    title="Eliminar"
                    onClick={() => handleEliminar(u.id)}
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
