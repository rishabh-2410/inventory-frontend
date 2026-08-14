import { apiClient } from "@/lib/apiclient";
import { AddWarehouseRequest, UpdateWarehouseRequest, warehouseSchema } from "@/models/zodSchema/warehouse.schema";
import {z} from "zod";

export const getWarehouses = async () => {
    const response = await apiClient.get('/warehouse');
    return z.array(warehouseSchema).parse(response.data);
}


export const addWarehouse = async (data: AddWarehouseRequest) => {
    const response = await apiClient.post('/warehouse', data);
    return warehouseSchema.parse(response.data);
}


export const updateWarehouse = async (id: string, data: UpdateWarehouseRequest) => {
    const response = await apiClient.patch(`/warehouse/${id}`, data);
    return warehouseSchema.parse(response.data);
}


export const deleteWarehouse = async(warehouseId: string) => {
    const response = await apiClient.delete(`/warehouse/${warehouseId}`);
    return response.status === 200;
}