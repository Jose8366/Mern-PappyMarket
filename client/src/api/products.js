import axios from "axios";
const API_URL = "http://localhost:4000/api"; // Ajusta la URL según corresponda

axios.defaults.withCredentials = true;

export const getProductsRequest = async () => {
  try {
    return await axios.get(`${API_URL}/products`);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const createProductRequest = async (product) => {
  try {
    console.log("Enviando datos al servidor:", product);
    const response = await axios.post(`${API_URL}/products`, product);
    return response;
  } catch (error) {
    console.error(
      "Error al crear producto:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateProductRequest = async (id, product) => {
  try {
    return await axios.put(`${API_URL}/products/${id}`, product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw error;
  }
};

export const deleteProductRequest = async (id) => {
  try {
    return await axios.delete(`${API_URL}/products/${id}`);
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

export const getProductRequest = async (id) => {
  try {
    return await axios.get(`${API_URL}/products/${id}`);
  } catch (error) {
    console.error("Error al obtener producto:", error);
    throw error;
  }
};
