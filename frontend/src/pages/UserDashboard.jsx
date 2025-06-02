import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { BiQrScan } from "react-icons/bi";
import AddOrEditPetModal from "../components/AddOrEditPetModal";
import QrModal from "../components/QrModal";
import {
  obtenerMascotasPorDueno,
  crearMascota,
  editarMascota,
  eliminarMascota
} from "../services/mascotaServices";


const UserDashboard = () => {
  const [mascotas, setMascotas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [mascotaQR, setMascotaQR] = useState(null);
  const [mascotaEditando, setMascotaEditando] = useState(null);

  const idDueno = 1; // ← Reemplaza por ID real del usuario si tienes login implementado

  // Obtener mascotas desde el backend
useEffect(() => {
  const cargarMascotas = async () => {
    try {
      const resultado = await obtenerMascotasPorDueno(1); 
      console.log("Mascotas cargadas:", resultado); 
      setMascotas(resultado); 
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    }
  };

  cargarMascotas();
}, []);

  // Filtro de búsqueda
  const mascotasFiltradas = mascotas.filter((m) =>
    `${m.nombre} ${m.tipo || ""} ${m.raza || ""}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

const handleEliminar = async (id, index) => {
  try {
    await eliminarMascota(id); // Llama al backend
    setMascotas((prev) => prev.filter((_, i) => i !== index)); // Actualiza la vista
    console.log("Mascota eliminada con éxito.");
  } catch (error) {
    console.error("Error al eliminar la mascota:", error);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center animate-fadeIn">
        <Link to="/" className="text-2xl font-bold text-red-600 flex items-center gap-2">
          🐾 MascotasID
        </Link>
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link to="/dashboard" className="hover:text-red-600">Panel de Control</Link>
          <Link to="/mapa" className="hover:text-red-600">Mapa</Link>
          <Link to="/notificaciones" className="hover:text-red-600">Notificaciones</Link>
        </nav>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </header>

      {/* Contenido */}
      <main className="px-8 py-10">
        {/* Título */}
        <div className="flex justify-between items-center mb-6 animate-fadeIn">
          <h1 className="text-3xl font-extrabold">Mis Mascotas</h1>
          <button
            onClick={() => {
              setMascotaEditando(null);
              setModalVisible(true);
            }}
            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Añadir Nueva Mascota
          </button>
        </div>

        {/* Buscador */}
        <div className="mb-6 relative max-w-md animate-fadeIn">
          <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre, tipo o raza..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        {/* Grid de mascotas */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {mascotasFiltradas.map((mascota, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">{mascota.nombre}</h3>
              <p className="mt-1 text-gray-600">{mascota.tipo || "Tipo desconocido"} · {mascota.raza || "Raza desconocida"}</p>
              <div className="mt-4 text-gray-700">
                <p>Total de Escaneos: {mascota.escaneos ?? 0}</p>
                <p>Último Escaneo: {mascota.ultimo ?? "Sin registro"}</p>
              </div>

              {/* Botones de acción */}
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  onClick={() => {
                    setMascotaQR(mascota);
                    setQrModalVisible(true);
                  }}
                >
                  <BiQrScan className="text-gray-600" /> Código QR
                </button>

                <button
                  className="flex items-center gap-1 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition"
                  onClick={() => {
                    setMascotaEditando({ ...mascota, index: idx }); 
                    setModalVisible(true);
                  }}

                >
                  <FiEdit className="text-gray-600" /> Editar
                </button>

                <button
                  className="flex items-center gap-1 border border-red-500 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition"
                  onClick={() => handleEliminar(mascota.id, idx)} // ← PASA el ID real
                >
                  <FiTrash2 /> Eliminar
                </button>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Modal de añadir/editar */}
      <AddOrEditPetModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setMascotaEditando(null);
        }}
        mascota={mascotaEditando}
        onSave={async (nuevaMascota, index) => {
          try {
            if (typeof index === "number") {
              // Modo edición
              const mascotaOriginal = mascotas[index];
              await editarMascota(mascotaOriginal.id, nuevaMascota);

              setMascotas((prev) =>
                prev.map((m, i) =>
                  i === index
                    ? {
                        ...m,
                        nombre: nuevaMascota.nombre,
                        descripcion: nuevaMascota.descripcion,
                      }
                    : m
                )
              );
            } else {
              // Modo creación
              const mascotaARegistrar = {
                ...nuevaMascota,
                id_dueno: idDueno,
              };

              const response = await crearMascota(mascotaARegistrar);

              setMascotas((prev) => [
                ...prev,
                {
                  ...nuevaMascota,
                  id: response.id,
                  escaneos: 0,
                  ultimo: new Date().toLocaleString(),
                },
              ]);
            }

            setModalVisible(false);
            setMascotaEditando(null);
          } catch (error) {
            console.error("Error al guardar la mascota:", error);
          }
        }}

      />

      {/* Modal de QR */}
      <QrModal
        visible={qrModalVisible}
        onClose={() => setQrModalVisible(false)}
        mascota={mascotaQR}
      />
    </div>
  );
};

export default UserDashboard;
