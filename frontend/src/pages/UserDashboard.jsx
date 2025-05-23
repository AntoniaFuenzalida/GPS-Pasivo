import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiQrScan } from "react-icons/bi";
import AddPetModal from "../components/AddOrEditPetModal";
import QrModal from "../components/QrModal";

const UserDashboard = () => {
  const [mascotas, setMascotas] = useState([
    { nombre: "Max", tipo: "Perro", raza: "Golden Retriever", escaneos: 12, ultimo: "25/4/2025, 10:30:00" },
    { nombre: "Luna", tipo: "Gato", raza: "Siamés", escaneos: 5, ultimo: "26/4/2025, 5:15:00" },
    { nombre: "Buddy", tipo: "Perro", raza: "Labrador", escaneos: 8, ultimo: "24/4/2025, 12:45:00" }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [qrModalVisible, setQrModalVisible] = useState(false);
  const [mascotaQR, setMascotaQR] = useState(null);
  const [mascotaEditando, setMascotaEditando] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="text-xl font-bold text-red-600">🐾 MascotasID</div>
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link to="/dashboard" className="hover:text-red-600">Panel de Control</Link>
          <Link to="/mis-mascotas" className="hover:text-red-600">Mis Mascotas</Link>
          <Link to="/mapa" className="hover:text-red-600">Mapa</Link>
          <Link to="/notificaciones" className="hover:text-red-600">Notificaciones</Link>
        </nav>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </header>

      {/* Contenido */}
      <main className="px-8 py-10">
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setModalVisible(true)}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Añadir Nueva Mascota
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {mascotas.map((mascota, idx) => (
            <div key={idx} className="bg-white border border-gray-300 rounded p-6 shadow-sm">
              <h3 className="text-lg font-bold">{mascota.nombre}</h3>
              <p className="text-sm text-gray-600">{mascota.tipo} · {mascota.raza}</p>
              <div className="mt-4 text-sm text-gray-700">
                <p>Total de Escaneos: {mascota.escaneos}</p>
                <p>Último Escaneo: {mascota.ultimo}</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
                  onClick={() => {
                    setMascotaQR(mascota);
                    setQrModalVisible(true);
                  }}
                >
                  <BiQrScan /> Código QR
                </button>
                <button
                  className="flex items-center gap-1 border border-gray-300 px-3 py-1 rounded hover:bg-gray-100"
                  onClick={() => {
                    setMascotaEditando({ ...mascota, index: idx });
                    setModalVisible(true);
                  }}
                >
                  <FiEdit /> Editar
                </button>
                <button
                  className="flex items-center gap-1 border border-red-500 text-red-600 px-3 py-1 rounded hover:bg-red-100"
                  onClick={() => {
                    setMascotas(prev => prev.filter((_, i) => i !== idx));
                  }}
                >
                  <FiTrash2 /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AddPetModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setMascotaEditando(null);
        }}
        mascota={mascotaEditando}
        onSave={(nuevaMascota, index) => {
          setMascotas(prev => {
            if (typeof index === "number") {
              const actualizadas = [...prev];
              actualizadas[index] = nuevaMascota;
              return actualizadas;
            }
            return [...prev, nuevaMascota];
          });
          setModalVisible(false);
          setMascotaEditando(null);
        }}
      />

      <QrModal visible={qrModalVisible} onClose={() => setQrModalVisible(false)} mascota={mascotaQR} />
    </div>
  );
};

export default UserDashboard;
