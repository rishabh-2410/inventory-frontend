import {z} from "zod";

export const warehouseSchema = z.object({
    id: z.string(),
    business_id: z.string(),
    name: z.string(),
    address: z.string(),

});

export type Warehouse = z.infer<typeof warehouseSchema>;