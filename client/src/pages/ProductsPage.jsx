import { useEffect } from "react";
import { useProducts } from "../context/productsContext";
import { ProductCard } from "../components/products/ProductCard";
import { ImFileEmpty } from "react-icons/im";

export function ProductsPage() {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await getProducts();
        console.log("Productos obtenidos:", products);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      }
    };
    fetchProducts();
  }, [getProducts]);

  if (!Array.isArray(products)) {
    console.error("El valor de 'products' no es un array:", products);
    return (
      <div>
        Error al cargar los productos. Respuesta inesperada:{" "}
        {JSON.stringify(products)}
      </div>
    );
  }

  return (
    <>
      {!products.length ? (
        <div className="flex justify-center items-center p-10">
          <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
          <h1 className="font-bold text-xl">
            Aún no hay productos, agregue un nuevo producto
          </h1>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </>
  );
}
