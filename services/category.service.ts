import { apiClient } from "@/lib/apiclient";
import { Category, categorySchema } from "@/models/zodSchema/category.schema";
import z from "zod";

export const getCategory = async () => {
    const response = await apiClient.get('/category');
    console.log(response.data);
    return z.array(categorySchema).parse(response.data);
}