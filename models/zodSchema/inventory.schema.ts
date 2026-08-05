import {z} from "zod";

export const inventorySchema = z.object({
    id: z.string(),
    product_name: z.string(),
    sku: z.string(),
    category_name: z.string(),
    warehouse_name: z.string(),
    current_stock: z.number(),
    updated_at: z.string(),
});


export type Inventory = z.infer<typeof inventorySchema>;