import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { BiQrScan } from "react-icons/bi";
import AddOrEditPetModal from "../components/AddOrEditPetModal";
import QrModal from "../components/QrModal";

const datosMascotasInicial = [
  {
    nombre: "Max",
    tipo: "Perro",
    raza: "Golden Retriever",
    escaneos: 12,
    ultimo: "25/4/2025, 10:30:00",
  },
  {
    nombre: "Luna",
    tipo: "Gato",
    raza: "Siamés",
    escaneos: 5,
    ultimo: "26/4/2025, 5:15:00",
  },
  {
    nombre: "Buddy",
    tipo: "Perro",
    raza: "Labrador",
    escaneos: 8,
    ultimo: "24/4/2025, 12:45:00",
  },
];

const UserDashboard = () => {
  const [mascotas, setMascotas] = useState(datosMascotasInicial);
  const [busqueda, setBusqueda] = useState("");          // Para filtro (opcional)
  const [modalVisible, setModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [mascotaQR, setMascotaQR] = useState(null);
  const [mascotaEditando, setMascotaEditando] = useState(null);

  // Filtrar por nombre, tipo o raza (puedes ajustar campos)
  const mascotasFiltradas = mascotas.filter((m) =>
    `${m.nombre} ${m.tipo} ${m.raza}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const handleEliminar = (index) => {
    setMascotas((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center animate-fadeIn">
        <Link to="/" className="text-2xl font-bold text-red-600 flex items-center gap-2">
          🐾 MascotasID
        </Link>
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link to="/dashboard" className="hover:text-red-600">
            Panel de Control
          </Link>
          <Link to="/mapa" className="hover:text-red-600">
            Mapa
          </Link>
          <Link to="/notificaciones" className="hover:text-red-600">
            Notificaciones
          </Link>
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

        {/* Buscador (opcional) */}
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

        {/* Grid de tarjetas de mascota */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {mascotasFiltradas.map((mascota, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800">{mascota.nombre}</h3>
              <p className="mt-1 text-gray-600">
                {mascota.tipo} · {mascota.raza}
              </p>
              <div className="mt-4 text-gray-700">
                <p>Total de Escaneos: {mascota.escaneos}</p>
                <p>Último Escaneo: {mascota.ultimo}</p>
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
                  onClick={() => handleEliminar(idx)}
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
        onSave={(nuevaMascota, index) => {
          setMascotas((prev) => {
            if (typeof index === "number") {
              const copia = [...prev];
              copia[index] = nuevaMascota;
              return copia;
            }
            return [...prev, nuevaMascota];
          });
          setModalVisible(false);
          setMascotaEditando(null);
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
