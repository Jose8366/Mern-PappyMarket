import { useProducts } from "../../context/productsContext";
import { Button, ButtonLink, Card } from "../ui";

export function ProductCard({ product }) {
  const { deleteProduct } = useProducts();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteProduct(product._id)}>Delete</Button>
          <ButtonLink to={`/products/${product._id}`}>Edit</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300 mb-4">{product.description}</p>
      <p className="font-bold text-xl text-green-600">
        Costo:{" "}
        {product.cost && !isNaN(product.cost)
          ? product.cost.toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })
          : "No disponible"}
      </p>
    </Card>
  );
}
