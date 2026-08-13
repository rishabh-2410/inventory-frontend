import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  category_id: z.string(),
  business_id: z.string(),
  sku: z.string(),
  selling_price: z.number(),
  cost_price: z.number(),
  image_url: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Product = z.infer<typeof productSchema>;


export const addProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  category_id: z.string().min(1, { message: "Category is required" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  selling_price: z.number().min(0, { message: "Selling price is required" }),
  cost_price: z.number().min(0, { message: "Cost price is required" }),
  image_url: z.string(),
});

export type AddProductRequest = z.infer<typeof addProductSchema>;