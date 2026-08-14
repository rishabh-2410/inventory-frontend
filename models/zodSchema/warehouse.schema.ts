import {z} from "zod";

export const warehouseSchema = z.object({
    id: z.string(),
    business_id: z.string(),
    name: z.string(),
    address: z.string(),

});

export type Warehouse = z.infer<typeof warehouseSchema>;


export const addWarehouseSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().min(1, { message: "Address is required" }),
});

export type AddWarehouseRequest = z.infer<typeof addWarehouseSchema>;


export const updateWarehouseSchema = z.object({
    name: z.string(),
    address: z.string()
});

export type UpdateWarehouseRequest = z.infer<typeof updateWarehouseSchema>;