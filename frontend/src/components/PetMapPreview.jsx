import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Ajuste para que Leaflet cargue correctamente los iconos
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const PetMapPreview = ({ lat, lng }) => {
  // Valor por defecto si lat/lng son indefinidos
  const position = [
    lat || -33.4489, // Valor por defecto
    lng || -70.6693, // Valor por defecto
  ];

  return (
    <div className="border rounded overflow-hidden relative z-0" style={{ height: "250px" }}>
      <MapContainer
        center={position}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          // Solo ajustar la vista si tenemos coordenadas válidas
          if (lat && lng) {
            map.setView([lat, lng], 15);
          }
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Última ubicación conocida</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PetMapPreview;
