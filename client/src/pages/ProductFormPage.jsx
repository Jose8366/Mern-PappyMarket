import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useProducts } from "../context/productsContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";

export function ProductFormPage() {
  const { createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const cost = parseFloat(data.cost);
      if (isNaN(cost)) {
        alert("El costo debe ser un número válido");
        return;
      }
      if (params.id) {
        await updateProduct(params.id, { ...data, cost });
      } else {
        await createProduct({ ...data, cost }); // Asegúrate de enviar cost como número
      }
      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("Hubo un error al guardar el producto. Intenta nuevamente.");
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadProduct = async () => {
      if (params.id) {
        try {
          const product = await getProduct(params.id, {
            signal: abortController.signal,
          });
          if (product) {
            setValue("title", product.title);
            setValue("description", product.description);
            setValue("cost", product.cost); // Se asume que 'product.cost' es un número
          }
        } catch (error) {
          console.error("Error al cargar el producto:", error);
        }
      }
    };
    loadProduct();
    return () => abortController.abort();
  }, [params.id, getProduct, setValue]);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Product Title"
          {...register("title", { required: "Title is required" })}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}

        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Product Description"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && (
          <p className="text-red-500 text-xs italic">
            {errors.description.message}
          </p>
        )}

        <Label htmlFor="cost">Cost (COP)</Label>
        <Input
          type="number"
          step="0.01"
          name="cost"
          placeholder="Product Cost"
          {...register("cost", {
            required: "Cost is required",
            validate: (value) =>
              !isNaN(value) ? true : "Cost must be a valid number",
          })}
        />
        {errors.cost && (
          <p className="text-red-500 text-xs italic">{errors.cost.message}</p>
        )}

        <Button>Guardar</Button>
      </form>
    </Card>
  );
}
