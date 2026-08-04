import { z } from 'zod';


export const dashboardSchema = z.object({
    current_inventory: z.number(),
    low_stock_products: z.number(),
    out_of_stock_products: z.number(),
})

export const inventoryStatsSchema = z.object({
    units_sold: z.number(),
    units_received: z.number(),
    units_damaged: z.number(),
    units_returned: z.number(),
})

export type DashboardStats = z.infer<typeof dashboardSchema>;
export type InventoryStats = z.infer<typeof inventoryStatsSchema>;