import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  cost: z
    .union([
      z.number(),
      z.string().regex(/^\d+(\.\d+)?$/, "Debe ser un número válido"),
    ])
    .transform((val) => (typeof val === "string" ? parseFloat(val) : val))
    .refine((val) => val >= 0, {
      message: "El costo debe ser un número positivo",
    }),
});
