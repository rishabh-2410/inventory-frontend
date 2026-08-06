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