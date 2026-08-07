import { z } from "zod";


// Stock movement history
export const stockMovementHistorySchema = z.object({
  data: z.array(z.object({
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
  })),
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  has_next: z.boolean(),
});

export type StockMovementHistory = z.infer<typeof stockMovementHistorySchema>;



// Stock movement request DTO
export const stockMovementRequestSchema = z.object({
  product_id: z.string(),
  warehouse_id: z.string(),
  movement_quantity: z.number(),
  movement_type: z.string(),
  reason: z.string(),
});

export type StockMovementRequest = z.infer<typeof stockMovementRequestSchema>;



// Stock movement response DTO
export const stockMovementResponseSchema = z.object({
  product_stock_id: z.string(),
  product_id: z.string(),
  warehouse_id: z.string(),
  current_stock: z.number(),
  movement_type: z.string(),
  movement_quantity: z.number(),
  reason: z.string(),
  created_at: z.string(),
});

export type StockMovementResponse = z.infer<typeof stockMovementResponseSchema>;