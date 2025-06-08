import React, { useState } from "react";
import { FiEdit, FiTrash2, FiSearch, FiX } from "react-icons/fi";
import { PiPawPrintFill } from "react-icons/pi";

const AdminUsuarios = () => {
  const initialUsers = [
    {
      id: 1,
      nombre: "Juan Pérez",
      correo: "juan.perez@ejemplo.com",
      estado: "Activo",
      registrado: "15/01/2025",
      mascotas: [
        { id: 101, nombre: "Max", tipo: "Perro", raza: "Golden Retriever" },
        { id: 102, nombre: "Luna", tipo: "Gato", raza: "Siamés" },
      ],
    },
    {
      id: 2,
      nombre: "María González",
      correo: "maria.gonzalez@ejemplo.com",
      estado: "Activo",
      registrado: "20/02/2025",
      mascotas: [
        { id: 103, nombre: "Chispa", tipo: "Ave", raza: "Periquito" },
      ],
    },
    {
      id: 3,
      nombre: "Roberto Jiménez",
      correo: "roberto.jimenez@ejemplo.com",
      estado: "Inactivo",
      registrado: "10/03/2025",
      mascotas: [
        { id: 104, nombre: "Buddy", tipo: "Perro", raza: "Labrador" },
        { id: 105, nombre: "Mimi", tipo: "Gato", raza: "Persa" },
        { id: 106, nombre: "Kiwi", tipo: "Ave", raza: "Canario" },
      ],
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [busqueda, setBusqueda] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPetsModal, setShowPetsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({ nombre: "", correo: "", estado: "" });

  const filteredUsers = users.filter(u =>
    `${u.nombre} ${u.correo} ${u.estado}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setEditForm({ nombre: user.nombre, correo: user.correo, estado: user.estado });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setUsers(prev =>
      prev.map(u =>
        u.id === selectedUser.id
          ? { ...u, ...editForm }
          : u
      )
    );
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleOpenPets = (user) => {
    setSelectedUser(user);
    setShowPetsModal(true);
  };

  const handleOpenDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== selectedUser.id));
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-8 py-10">
      <div className="mb-6 animate-fadeIn">
        <h1 className="text-3xl font-extrabold">Usuarios</h1>
        <p className="text-gray-600 mt-1">Gestionar cuentas de usuario en el sistema</p>
      </div>

      {/* Filtro de búsqueda */}
      <div className="mb-4 relative max-w-md animate-fadeIn">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, correo o estado..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-fadeIn">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Correo</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Mascotas</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Registrado</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{user.nombre}</td>
                <td className="px-4 py-3 text-sm">{user.correo}</td>
                <td className="px-4 py-3 text-sm">{user.mascotas.length}</td>
                <td className="px-4 py-3 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.estado === "Activo"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm">{user.registrado}</td>
                <td className="px-4 py-3 text-center space-x-2">
                  <button
                    onClick={() => handleOpenEdit(user)}
                    className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition"
                    title="Editar Usuario"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => handleOpenPets(user)}
                    className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-100 transition"
                    title="Ver Mascotas"
                  >
                    <PiPawPrintFill />
                  </button>
                  <button
                    onClick={() => handleOpenDelete(user)}
                    className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-3 py-1 rounded hover:bg-red-100 transition"
                    title="Eliminar Usuario"
                  >
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No hay usuarios que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EditUserModal */}
      {showEditModal && selectedUser && (
        <EditUserModal
          visible={showEditModal}
          onClose={() => { setShowEditModal(false); setSelectedUser(null); }}
          user={selectedUser}
          editForm={editForm}
          setEditForm={setEditForm}
          onSave={handleSaveEdit}
        />
      )}

      {/* ViewPetsModal */}
      {showPetsModal && selectedUser && (
        <ViewPetsModal
          visible={showPetsModal}
          onClose={() => { setShowPetsModal(false); setSelectedUser(null); }}
          mascotas={selectedUser.mascotas}
        />
      )}

      {/* ConfirmDeleteModal */}
      {showDeleteModal && selectedUser && (
        <ConfirmDeleteModal
          visible={showDeleteModal}
          onClose={() => { setShowDeleteModal(false); setSelectedUser(null); }}
          onConfirm={handleConfirmDelete}
          userName={selectedUser.nombre}
        />
      )}
    </div>
  );
};

export default AdminUsuarios;

/* EditUserModal */
const EditUserModal = ({ visible, onClose, user, editForm, setEditForm, onSave }) => {
  if (!visible) return null;
  const handleChange = e => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-[9999] overflow-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl">
          <FiX />
        </button>
        <h2 className="text-2xl font-bold mb-2">Editar Usuario</h2>
        <p className="text-sm text-gray-500 mb-4">Modifica los datos del usuario y guarda los cambios.</p>
        <form onSubmit={e => { e.preventDefault(); onSave(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre Completo</label>
            <input
              name="nombre"
              value={editForm.nombre}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Correo Electrónico</label>
            <input
              name="correo"
              type="email"
              value={editForm.correo}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="estado"
              value={editForm.estado}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </div>
          <div className="pt-4 text-right">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ViewPetsModal */
const ViewPetsModal = ({ visible, onClose, mascotas }) => {
  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-[9999] overflow-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-gray-900 rounded-lg p-6 w-full max-w-lg shadow-xl animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl">
          <FiX />
        </button>
        <h2 className="text-2xl font-bold mb-2">Mascotas asociadas ({mascotas.length})</h2>
        <p className="text-sm text-gray-500 mb-4">Listado de mascotas de este usuario.</p>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {mascotas.map(m => (
            <div key={m.id} className="border-b pb-2 mb-2 last:border-none last:mb-0">
              <p className="font-semibold">{m.nombre}</p>
              <p className="text-gray-600 text-sm">{m.tipo} · {m.raza}</p>
            </div>
          ))}
          {mascotas.length === 0 && <p className="text-gray-600 text-center">No hay mascotas.</p>}
        </div>
        <div className="pt-4 text-right">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

/* ConfirmDeleteModal */
const ConfirmDeleteModal = ({ visible, onClose, onConfirm, userName }) => {
  if (!visible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-24 z-[9999] overflow-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-white text-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl">
          <FiX />
        </button>
        <h2 className="text-2xl font-bold mb-2">Confirmar Eliminación</h2>
        <p className="text-gray-600 mb-6">
          ¿Eliminar al usuario <strong>{userName}</strong>? Esta acción es irreversible.
        </p>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition">
            Cancelar
          </button>
          <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
