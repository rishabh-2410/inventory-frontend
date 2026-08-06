import { apiClient } from "@/lib/apiclient";
import { warehouseSchema } from "@/models/zodSchema/warehouse.schema";
import {z} from "zod";

export const getWarehouses = async () => {
    const response = await apiClient.get('/warehouse');
    return z.array(warehouseSchema).parse(response.data);
}