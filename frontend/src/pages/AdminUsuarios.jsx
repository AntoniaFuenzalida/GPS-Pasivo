import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiEdit2, FiTrash2, FiX } from "react-icons/fi";
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPetsModal, setShowPetsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editForm, setEditForm] = useState({ nombre: "", correo: "", estado: "" });


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

const handleSaveEdit = async () => {
  try {
    await axios.put(`http://localhost:3001/api/update`, editForm);
    toast.success("Usuario actualizado correctamente");
    setShowEditModal(false);
    setSelectedUser(null);
    fetchUsuarios(); // Recargar la lista
  } catch (err) {
    toast.error(err?.response?.data?.error || "Error al actualizar usuario");
    console.error("Error al actualizar usuario:", err);
  }
};

const handleConfirmDelete = async () => {
  if (selectedUser) {
    await handleEliminar(selectedUser.id);
    setShowDeleteModal(false);
    setSelectedUser(null);
  }
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
                </td>                <td className="px-6 py-4 whitespace-nowrap text-center space-x-2">
                  <button 
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition" 
                    title="Editar"
                    onClick={() => {
                      setSelectedUser(u);
                      setEditForm({ nombre: u.nombre, correo: u.correo, estado: u.estado || "" });
                      setShowEditModal(true);
                    }}
                  >
                    <FiEdit2 className="text-gray-600" />
                  </button>
                  <button 
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition" 
                    title="Ver mascotas"
                    onClick={() => {
                      setSelectedUser(u);
                      setShowPetsModal(true);
                    }}
                  >
                    <PiPawPrintFill className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-red-100 transition text-red-600"
                    title="Eliminar"
                    onClick={() => {
                      setSelectedUser(u);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FiTrash2 />
                  </button>

                </td>
              </tr>            ))}
            {usuariosFiltrados.length === 0 && (
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
      )}      {/* ViewPetsModal */}
      {showPetsModal && selectedUser && (
        <ViewPetsModal
          visible={showPetsModal}
          onClose={() => { setShowPetsModal(false); setSelectedUser(null); }}
          userId={selectedUser.id}
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
const ViewPetsModal = ({ visible, onClose, mascotas, userId }) => {
  const [mascotasData, setMascotasData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible && userId) {
      fetchMascotasUsuario(userId);
    }
  }, [visible, userId]);

  const fetchMascotasUsuario = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/api/mascotas/dueno/${id}`);
      setMascotasData(response.data);
    } catch (err) {
      console.error("Error al obtener mascotas:", err);
      toast.error("Error al cargar las mascotas");
      setMascotasData([]);
    } finally {
      setLoading(false);
    }
  };

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
        <h2 className="text-2xl font-bold mb-2">
          Mascotas asociadas ({loading ? "..." : mascotasData.length})
        </h2>
        <p className="text-sm text-gray-500 mb-4">Listado de mascotas de este usuario.</p>
        <div className="space-y-4 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="text-gray-600 text-center">Cargando mascotas...</p>
          ) : mascotasData.length > 0 ? (
            mascotasData.map(m => (
              <div key={m.id} className="border-b pb-2 mb-2 last:border-none last:mb-0">
                <p className="font-semibold">{m.nombre}</p>
                <p className="text-gray-600 text-sm">{m.descripcion}</p>
                <p className="text-gray-500 text-xs">Registrada: {new Date(m.fecha_registro).toLocaleDateString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No hay mascotas registradas.</p>
          )}
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
