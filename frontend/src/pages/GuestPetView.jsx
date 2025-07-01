import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import PetHeader from "../components/PetHeader";
import OwnerContactCard from "../components/OwnerContactCard";
import PetMapPreview from "../components/PetMapPreview";
import CommentsModal from "../components/CommentsModal";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9008/api";

const GuestPetView = () => {
  const { id } = useParams();
  const [mascotaComentarios, setMascotaComentarios] = useState([]);
  const [ultimaUbicacion, setUltimaUbicacion] = useState({});
  const [mascota, setMascota] = useState(null);
  const [mostrarNotas, setMostrarNotas] = useState(false);
  const [contacto, setContacto] = useState({
    telefono: "No disponible",
    correo: "No disponible",
  });
  const [newComment, setNewComment] = useState("");

  const fetchContacto = useCallback(async (duenoId) => {
    if (!duenoId) return;
    try {
      const res = await fetch(`${API_URL}/usuarios/contacto/${duenoId}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setContacto({
        telefono: data.telefono || "No disponible",
        correo: data.correo || "No disponible",
      });
    } catch {
      setContacto({ telefono: "No disponible", correo: "No disponible" });
    }
  }, []);

  const fetchComentarios = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/mascotas/comentarios/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMascotaComentarios(data.map((c) => c.info));
    } catch {
      setMascotaComentarios([]);
    }
  }, [id]);

  const fetchUltimaUbicacion = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/mascotas/ubicacion/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setUltimaUbicacion(data);
    } catch {
      setUltimaUbicacion({});
    }
  }, [id]);

  const fetchMascota = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/mascotas/obtener/${id}`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setMascota(data);
      return data;
    } catch {
      setMascota(null);
      return null;
    }
  }, [id]);

  // Al iniciar
  useEffect(() => {
    if (!id) return;
    (async () => {
      const pet = await fetchMascota();
      if (pet?.id_dueno) await fetchContacto(pet.id_dueno);
      await fetchComentarios();
      await fetchUltimaUbicacion();
    })();
  }, [id, fetchMascota, fetchContacto, fetchComentarios, fetchUltimaUbicacion]);

  // Añadir comentario simple
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await fetch(`${API_URL}/mascotas/comentarios/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ info: newComment.trim() }),
      });
      if (!res.ok) throw new Error();
      setNewComment("");
      await fetchComentarios();
    } catch (err) {
      console.error("Error al añadir comentario", err);
    }
  };

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
        <PetHeader nombre={mascota.nombre} descripcion={mascota.descripcion} />

        <div className="p-6 space-y-6">
          <OwnerContactCard
            contacto={{
              nombreDueno: mascota.nombre_dueno || "No disponible",
              telefono: contacto.telefono,
              correo: contacto.correo,
            }}
          />

          {ultimaUbicacion.latitud && (
            <PetMapPreview lat={ultimaUbicacion.latitud} lng={ultimaUbicacion.longitud} />
          )}

          {/* Botón ver notas */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setMostrarNotas(true)}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Ver notas
            </button>
            {/* Nuevo textarea + botón */}
            <div className="flex-1 ml-4 flex gap-2">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={1}
                placeholder="Escribe un comentario..."
                className="flex-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm resize-none"
              />
              <button
                onClick={handleAddComment}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>

      {mostrarNotas && (
        <CommentsModal comentarios={mascotaComentarios} onClose={() => setMostrarNotas(false)} />
      )}
    </div>
  );
};

export default GuestPetView;
