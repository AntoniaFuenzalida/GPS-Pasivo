// ✅ mascotaServices.js
import axios from "axios";

const API_URL = "http://localhost:3001/api/mascotas";

// ✅ Agrega esta función correctamente
export const obtenerMascotasPorDueno = async (id_dueno) => {
  const response = await axios.get(`${API_URL}/dueno/${id_dueno}`);
  return response.data;
};

export const obtenerMascotas = async () => {
  const response = await axios.get(`${API_URL}/obtener`);
  return response.data;
};

export const crearMascota = async (mascota) => {
  const response = await axios.post(`${API_URL}/crear`, {
    nombre: mascota.nombre,
    descripcion: mascota.descripcion || "",
    id_dueno: mascota.id_dueno,
  });
  return response.data;
};

export const editarMascota = async (id, mascota) => {
  const response = await axios.put(`${API_URL}/editar/${id}`, {
    nombre: mascota.nombre,
    descripcion: mascota.descripcion || "",
  });
  return response.data;
};

export const eliminarMascota = async (id) => {
  const response = await axios.delete(`${API_URL}/eliminar/${id}`);
  return response.data;
};
