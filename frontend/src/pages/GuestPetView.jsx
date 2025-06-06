import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PetHeader from "../components/PetHeader";
import PetMedicalInfo from "../components/PetMedicalInfo";
import OwnerContactCard from "../components/OwnerContactCard";
import PetMapPreview from "../components/PetMapPreview";
import CommentsModal from "../components/CommentsModal";

// Datos de ejemplo (mock); en producción, reemplázalo por fetch a tu API
const mockPetData = {
  id: "12345",
  nombre: "Max",
  fotoUrl: "https://via.placeholder.com/600x400.png?text=Max",
  tipo: "Perro",
  raza: "Golden Retriever",
  edad: "3 años",
  alergias: "No se registraron alergias.",
  notas: "Muy amigable, teme a los fuegos artificiales.",
  ultimaUbicacion: {
    lat: 40.4168,
    lng: -3.7038,
    texto: "Parque Central",
  },
  contacto: {
    nombreDueno: "Juan Pérez",
    telefono: "+56912345678",
    correo: "juan.perez@ejemplo.com",
    whatsapp: "+56912345678",
  },
};

const GuestPetView = () => {
  const { id } = useParams();
  const [petData, setPetData] = useState(null);
  const [mostrarNotas, setMostrarNotas] = useState(false);

  useEffect(() => {
    // Simular carga de datos; en producción, haz fetch(`/api/pets/${id}`)
    if (id === mockPetData.id) {
      setPetData(mockPetData);
    } else {
      setPetData(null);
    }
  }, [id]);

  if (!petData) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex items-center justify-center">
        <p className="text-gray-600 animate-fadeIn">
          No se encontró información para la mascota con ID: {id}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
        {/* 1. Foto + nombre + raza/edad */}
        <PetHeader
          fotoUrl={petData.fotoUrl}
          nombre={petData.nombre}
          tipo={petData.tipo}
          raza={petData.raza}
          edad={petData.edad}
        />

        <div className="p-6 space-y-6">
          {/* 2. Información médica */}
          <PetMedicalInfo alergias={petData.alergias} />

          {/* 3. Contacto del dueño */}
          <OwnerContactCard contacto={petData.contacto} />

          {/* 4. Mapa con última ubicación */}
          <PetMapPreview
            lat={petData.ultimaUbicacion.lat}
            lng={petData.ultimaUbicacion.lng}
            texto={petData.ultimaUbicacion.texto}
          />

          {/* 5. Botón “Ver notas adicionales” */}
          {petData.notas && (
            <div className="text-right">
              <button
                onClick={() => setMostrarNotas(true)}
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Ver notas
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de notas adicionales */}
      {mostrarNotas && (
        <CommentsModal
          comentario={petData.notas}
          onClose={() => setMostrarNotas(false)}
        />
      )}
    </div>
  );
};

export default GuestPetView;
