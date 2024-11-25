import { createContext, useContext, useState } from "react";
import {
  createProductRequest,
  deleteProductRequest,
  getProductsRequest,
  getProductRequest,
  updateProductRequest,
} from "../api/products";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProduct must be used within a ProductProvider");
  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      console.log("Respuesta del servidor:", res.data); // Depuración
      setProducts(res.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 204)
        setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product) => {
    try {
      const res = await createProductRequest(product);
      setProducts((prevProducts) => [...prevProducts, res.data]); // Actualiza el estado con el nuevo producto
      console.log("Producto creado:", res.data);
    } catch (error) {
      // Si la respuesta es un error HTTP, maneja el error de forma más detallada
      if (error.response) {
        console.error("Error al crear el producto:", error.response.data);
        alert(
          `Error al crear el producto: ${
            error.response.data.message || "Datos no válidos"
          }`
        );
      }
      // Si no hay respuesta (por ejemplo, el servidor no está disponible)
      else if (error.request) {
        console.error("No se recibió respuesta del servidor:", error.request);
        alert("No se recibió respuesta del servidor. Verifica la conexión.");
      }
      // Otros errores generales
      else {
        console.error("Error desconocido:", error.message);
        alert(`Error desconocido: ${error.message}`);
      }
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      await updateProductRequest(id, product);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        deleteProduct,
        createProduct,
        getProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
