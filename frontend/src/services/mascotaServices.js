
import axios from "axios";

const API_URL = "http://localhost:3001/api/mascotas";

export const obtenerMascotasPorDueno = async (id_dueno) => {
  const response = await axios.get(`${API_URL}/dueno/${id_dueno}`);
  return response.data;
};

export const obtenerMascotas = async () => {
  const response = await axios.get(`${API_URL}/obtener`);
  return response.data;
};

export const crearMascota = async (mascota) => {
  try {
    const response = await axios.post(`${API_URL}/crear`, {
      nombre: mascota.nombre,
      descripcion: mascota.descripcion || "",
      id_dueno: mascota.id_dueno,
    });
    console.log("📤 Mascota enviada:", mascota);
    return response.data;
  } catch (error) {
    console.error("❌ Error en crearMascota (frontend):", error.response?.data || error.message);
    throw error;
  }
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
