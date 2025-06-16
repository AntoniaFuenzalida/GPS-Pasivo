import axios from "../axiosSetup";


// Actualizar nombre y/o teléfono
export const actualizarPerfil = async (datos) => {
  const response = await axios.put("/update", datos);
  return response.data;
};

// Cambiar contraseña
export const cambiarContrasena = async ({ actual, nueva }) => {
  const response = await axios.put("/cambiar-contrasena", { actual, nueva });
  return response.data;
};
