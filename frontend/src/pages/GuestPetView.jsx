import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import PetHeader from "../components/PetHeader";
// import PetMedicalInfo from "../components/PetMedicalInfo";
import OwnerContactCard from "../components/OwnerContactCard";
import PetMapPreview from "../components/PetMapPreview";
import CommentsModal from "../components/CommentsModal";

const GuestPetView = () => {
  const { id } = useParams();
  const [mascotaComentarios, setMascotaComentarios] = useState(null);
  const [ultimaUbicacion, setUltimaUbicacion] = useState({});
  const [mascota, setMascota] = useState(null);
  const [mostrarNotas, setMostrarNotas] = useState(false);

  // Inicializa contacto con un objeto vacío con propiedades por defecto
  const [contacto, setContacto] = useState({
    telefono: "No disponible", 
    correo: "No disponible"
    });

  // 1. Modifica fetchContacto para aceptar un ID como parámetro
  const fetchContacto = useCallback(async (duenoId) => {
    if (!duenoId) {
      console.log("ID de dueño no proporcionado");
      return;
    }
    
    try {
      console.log("Intentando obtener contacto para dueño ID:", duenoId);
      const response = await fetch(`http://localhost:3001/api/usuarios/contacto/${duenoId}`);
      if (!response.ok) {
        throw new Error("Error al obtener el contacto del dueño");
      }
      const data = await response.json();
      setContacto({
        telefono: data.telefono || "No disponible",
        correo: data.correo || "No disponible"
      });
      console.log("Contacto obtenido:", data);
    } catch (error) {
      console.error("Error fetching contacto:", error);
      // En caso de error, mantener valores por defecto
      setContacto({
        telefono: "No disponible",
        correo: "No disponible"
      });
    }
  }, []); // No necesita dependencias porque ahora recibe el ID por parámetro

  const fetchMascotaComentarios = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/mascotas/comentarios/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los comentarios de la mascota");
      }
      const data = await response.json();
      let comentarios = [];
      comentarios = data.map((comentario) => comentario.info);
      console.log("Comentarios obtenidos:", comentarios);
      setMascotaComentarios(comentarios);
    } catch (error) {
      console.error("Error fetching mascota comentarios:", error);
    }
  }, []);

  const fetchUltimaUbicacion = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/mascotas/ubicacion/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener la última ubicación de la mascota");
      }
      const data = await response.json();
      setUltimaUbicacion(data);
      console.log("Última ubicación obtenida:", data);
    } catch (error) {
      console.error("Error fetching ultima ubicacion:", error);
    }
  }, []);

  // 2. Modifica fetchMascota para que devuelva los datos de la mascota
  const fetchMascota = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/mascotas/obtener/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener la mascota");
      }
      const data = await response.json();
      setMascota(data);
      console.log("Mascota obtenida:", data);
      return data; // Devuelve los datos para usarlos inmediatamente
    } catch (error) {
      console.error("Error fetching mascota:", error);
      return null;
    }
  }, []);

  // 3. Simplifica fetchMascotaData para usar el valor devuelto por fetchMascota
  const fetchMascotaData = useCallback(async (id) => {
    try {
      // Obtener datos de la mascota primero
      const mascotaData = await fetchMascota(id);
      
      // Si tenemos el ID del dueño, obtener su contacto
      if (mascotaData && mascotaData.id_dueno) {
        await fetchContacto(mascotaData.id_dueno);
      }
      
      // Obtener el resto de datos
      await fetchMascotaComentarios(id);
      await fetchUltimaUbicacion(id);
    } catch (error) {
      console.error("Error en fetchMascotaData:", error);
    }
  }, [fetchMascota, fetchContacto, fetchMascotaComentarios, fetchUltimaUbicacion]);

  useEffect(() => {
    if (!id) {
      console.error("ID de mascota no proporcionado");
      return;
    }
    fetchMascotaData(id);
  }, [id, fetchMascotaData]); // Añadimos las dependencias


  if (!mascota || !ultimaUbicacion) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
          <div className="p-6 text-center text-gray-500">
            No se encontró la mascota o no hay datos disponibles.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden animate-fadeIn">
        <PetHeader
          nombre={mascota.nombre}
          descripcion={mascota.descripcion}
        />

        <div className="p-6 space-y-6">

          {/* 3. Contacto del dueño */}
          <OwnerContactCard 
            contacto={{
              nombreDueno: mascota?.nombre_dueno || "No disponible", 
              telefono: contacto?.telefono || "No disponible", 
              correo: contacto?.correo || "No disponible"
            }} />

          {/* 4. Mapa con última ubicación */}

          {ultimaUbicacion && ultimaUbicacion.latitud && ultimaUbicacion.longitud ? (
            <PetMapPreview
              lat={ultimaUbicacion.latitud}
              lng={ultimaUbicacion.longitud}
            />
          ) : (
            <div className="bg-gray-100 rounded p-4 text-center text-gray-500">
              Cargando mapa...
            </div>
          )}

          {/* 5. Botón “Ver notas adicionales” */}
          {mascotaComentarios && (
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
          comentarios={mascotaComentarios}
          onClose={() => setMostrarNotas(false)}
        />
      )}
    </div>
  );
};

export default GuestPetView;
