import { z } from "zod";

export const productSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string({
    required_error: "Description is required",
  }),
  cost: z.number({
    required_error: "Description is required",
  }),
});
