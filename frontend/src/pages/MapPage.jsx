import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { BsChatLeftText } from "react-icons/bs";
import CommentModal from "../components/CommentModal";

// Corrige íconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// Datos de ejemplo
const ubicaciones = [
  {
    nombre: "Max",
    lugar: "Parque Central",
    coords: [40.4168, -3.7038],
    fecha: "27/4/2025, 6:15:00",
    comentario: true,
    comentarioTexto: "Max fue encontrado corriendo sin correa en el parque. Lo detuve hasta que lo escanearon."
  },
  {
    nombre: "Max",
    lugar: "Calle Principal",
    coords: [40.4180, -3.7058],
    fecha: "25/4/2025, 10:30:00",
    comentario: false
  },
  {
    nombre: "Luna",
    lugar: "Avenida Roble",
    coords: [40.4170, -3.7048],
    fecha: "26/4/2025, 5:15:00",
    comentario: true,
    comentarioTexto: "Gatita muy amigable, parecía perdida pero tenía QR visible."
  },
  {
    nombre: "Buddy",
    lugar: "Calle Olmo",
    coords: [40.4148, -3.7058],
    fecha: "21/4/2025, 11:30:00",
    comentario: true,
    comentarioTexto: "Estaba asustado en la vereda, escaneé el código y llamé al dueño."
  }
];

const MapPage = () => {
  const [filtro, setFiltro] = useState("Todas");
  const [modalVisible, setModalVisible] = useState(false);
  const [comentarioActivo, setComentarioActivo] = useState("");

  const mascotasUnicas = [...new Set(ubicaciones.map(u => u.nombre))];
  const ubicacionesFiltradas = filtro === "Todas" ? ubicaciones : ubicaciones.filter(u => u.nombre === filtro);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow">
        <div className="text-xl font-bold text-red-600">🐾 MascotasID</div>
        <nav className="flex space-x-6 font-medium text-gray-700">
          <Link to="/dashboard" className="hover:text-red-600">Panel de Control</Link>
          <Link to="/mis-mascotas" className="hover:text-red-600">Mis Mascotas</Link>
          <Link to="/mapa" className="hover:text-red-600 font-semibold">Localizaciones</Link>
          <Link to="/historial" className="hover:text-red-600">Historial de Escaneos</Link>
          <Link to="/notificaciones" className="hover:text-red-600">Notificaciones</Link>
        </nav>
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </header>

      {/* Contenido */}
      <main className="px-8 py-10">
        <h2 className="text-2xl font-bold mb-4">Localizaciones de Mascotas</h2>
        <p className="text-sm text-gray-600 mb-6">Visualiza dónde se han escaneado los códigos QR de tus mascotas</p>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Mapa */}
          <div className="md:w-2/3 h-[500px] border border-gray-300 rounded overflow-hidden shadow">
            <MapContainer center={[40.4168, -3.7038]} zoom={13} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
              />
              {ubicacionesFiltradas.map((u, i) => (
                <Marker key={i} position={u.coords}>
                  <Popup>
                    <strong>{u.nombre}</strong><br />
                    {u.lugar}<br />
                    {u.fecha}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Historial lateral */}
          <div className="md:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Últimas ubicaciones</h3>
              <select
                value={filtro}
                onChange={(e) => setFiltro(e.target.value)}
                className="border border-gray-300 px-2 py-1 rounded text-sm"
              >
                <option value="Todas">Todas las mascotas</option>
                {mascotasUnicas.map((m, i) => (
                  <option key={i} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {ubicacionesFiltradas.map((u, idx) => (
                <div key={idx} className="bg-white border border-gray-300 rounded p-4 shadow-sm">
                  <h4 className="font-bold">{u.nombre}</h4>
                  <p className="text-sm text-gray-600">📍 {u.lugar}</p>
                  <p className="text-sm text-gray-600">🗓 {u.fecha}</p>
                  {u.comentario && (
                    <button
                      className="flex items-center gap-1 mt-2 text-blue-600 text-sm hover:underline"
                      onClick={() => {
                        setComentarioActivo(u.comentarioTexto || "Sin detalles");
                        setModalVisible(true);
                      }}
                    >
                      <BsChatLeftText /> Ver comentario
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal de comentario */}
        <CommentModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          comentario={comentarioActivo}
        />
      </main>
    </div>
  );
};

export default MapPage;
