import { apiClient } from "@/lib/apiclient";
import { AddCategoryRequest, categorySchema, UpdateCategoryRequest } from "@/models/zodSchema/category.schema";
import {z} from "zod";

export const getCategory = async () => {
    const response = await apiClient.get('/category');
    console.log(response.data);
    return z.array(categorySchema).parse(response.data);
}


export const addCategory = async (request: AddCategoryRequest) => {
    const response = await apiClient.post('/category', request);
    return categorySchema.parse(response.data);
}

export const updateCategory = async (id: string, request: UpdateCategoryRequest) => {
    const response = await apiClient.patch(`/category/${id}`, request);
    return categorySchema.parse(response.data);
}

export const deleteCategory = async(categoryId: string) => {
    const response = await apiClient.delete(`/category/${categoryId}`);
    return response.status === 200;
}