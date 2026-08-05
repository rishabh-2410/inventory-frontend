import { z } from "zod";

export const stockMovementHistorySchema = z.object({
  id: z.string(),
  user_id: z.string(),
  product_id: z.string(),
  movement_type: z.string(),
  movement_quantity: z.number(),
  reason: z.string(),
  created_at: z.string(),
  product_name: z.string(),
  sku: z.string(),
  warehouse_name: z.string(),
});

export type StockMovementHistory = z.infer<typeof stockMovementHistorySchema>;