import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:9008/api";

export const loginUser = async ({ correo, contrasena }) => {
  const response = await axios.post(`${API_URL}/login`, {
    correo,
    contrasena,
  });
  return response.data;
};

export const getMe = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
