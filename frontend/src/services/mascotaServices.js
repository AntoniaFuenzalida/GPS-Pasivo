
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:9008/api"}/mascotas`;

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
      tipo: mascota.tipo || "",
      raza: mascota.raza || "",
      edad: mascota.edad || "",
      alergias: mascota.alergias || "",
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
    tipo: mascota.tipo || "",
    raza: mascota.raza || "",
    edad: mascota.edad || "",
    alergias: mascota.alergias || "",
  });
  return response.data;
};

export const eliminarMascota = async (id) => {
  const response = await axios.delete(`${API_URL}/eliminar/${id}`);
  return response.data;
};
