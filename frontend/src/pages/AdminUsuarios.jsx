import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { PiPawPrintFill } from "react-icons/pi";

const usuarios = [
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
  Activo: "bg-green-700 text-green-100",
  Inactivo: "bg-zinc-700 text-zinc-300",
  Pendiente: "bg-yellow-700 text-yellow-100",
};

const AdminUsuarios = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-8 py-10">
      <h1 className="text-3xl font-bold mb-1">Panel de Administración</h1>
      <p className="text-zinc-400 mb-6">
        Gestiona usuarios, mascotas y visualiza estadísticas del sistema
      </p>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
        <h2 className="text-xl font-bold mb-1">Usuarios</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Gestionar cuentas de usuario en el sistema
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead>
              <tr className="text-sm text-zinc-400">
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Correo</th>
                <th className="px-3 py-2">Mascotas</th>
                <th className="px-3 py-2">Estado</th>
                <th className="px-3 py-2">Registrado</th>
                <th className="px-3 py-2 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={i} className="bg-zinc-950 hover:bg-zinc-900 transition">
                  <td className="px-3 py-2 font-medium">{u.nombre}</td>
                  <td className="px-3 py-2">{u.correo}</td>
                  <td className="px-3 py-2">{u.mascotas}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-semibold ${badgeStyle[u.estado]}`}
                    >
                      {u.estado}
                    </span>
                  </td>
                  <td className="px-3 py-2">{u.fecha}</td>
                  <td className="px-3 py-2 flex justify-center gap-2 text-lg">
                    <button className="p-2 rounded hover:bg-zinc-800" title="Editar">
                      <FiEdit2 />
                    </button>
                    <button className="p-2 rounded hover:bg-zinc-800" title="Ver mascotas">
                      <PiPawPrintFill />
                    </button>
                    <button className="p-2 rounded hover:bg-zinc-800 text-red-500" title="Eliminar">
                      <FiTrash2 />
                    </button>
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

export default AdminUsuarios;
