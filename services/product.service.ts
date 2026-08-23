import { apiClient } from "@/lib/apiclient";
import { EditProductRequest } from "@/models/types/product";
import { AddProductRequest, Product, productSchema } from "@/models/zodSchema/product.schema";
import {z} from "zod";

export const getProducts = async () => {
    const response = await apiClient.get<Product[]>("/product");
    return z.array(productSchema).parse(response.data);
}


export const editProduct = async(productId: string, request: EditProductRequest) => {
    const response = await apiClient.patch(`/product/${productId}`, request);
    return productSchema.parse(response.data);
}



export const addProduct = async(request: AddProductRequest) => {
    const response = await apiClient.post("/product", request);
    return productSchema.parse(response.data);
}


export const deleteProduct = async(productId: string) => {
    const response = await apiClient.delete(`/product/${productId}`);
    return response.status === 200;
}