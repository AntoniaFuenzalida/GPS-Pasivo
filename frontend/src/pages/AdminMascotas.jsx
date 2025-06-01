import { useEffect, useState } from "react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { BiQrScan } from "react-icons/bi";
import { obtenerMascotas, eliminarMascota } from "../services/mascotaServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const cargarMascotas = async () => {
      try {
        const resultado = await obtenerMascotas();
        setMascotas(resultado);
      } catch (error) {
        toast.error("Error al cargar mascotas");
      }
    };
    cargarMascotas();
  }, []);

  const mascotasFiltradas = mascotas.filter((m) =>
    `${m.nombre} ${m.tipo ?? ""} ${m.raza ?? ""} ${m.nombre_dueno ?? ""}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const handleEliminar = async (id) => {
    try {
      await eliminarMascota(id);
      setMascotas((prev) => prev.filter((m) => m.id !== id));
      toast.success("Mascota eliminada exitosamente");
    } catch (error) {
      toast.error("Error al eliminar mascota");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold">Mascotas Registradas</h1>
        <p className="text-gray-600 mt-1">
          Visualiza, edita o elimina mascotas desde esta vista administrativa.
        </p>
      </div>

      <div className="mb-6 relative max-w-md">
        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar por nombre, tipo, raza o dueño..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Nombre</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Tipo</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Raza</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Dueño</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Fecha Registro</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotasFiltradas.map((m) => (
              <tr
                key={m.id}
                className="border-b last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-800">{m.nombre}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{m.tipo ?? "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{m.raza ?? "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{m.nombre_dueno}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{new Date(m.fecha_registro).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center flex justify-center gap-2">
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                    title="Editar"
                    onClick={() => toast.info("Funcionalidad de edición próximamente")}
                  >
                    <FiEdit2 className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                    title="Ver QR"
                  >
                    <BiQrScan className="text-gray-600" />
                  </button>
                  <button
                    className="p-2 rounded-md bg-gray-100 hover:bg-red-100 text-red-600"
                    title="Eliminar"
                    onClick={() => handleEliminar(m.id)}
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
