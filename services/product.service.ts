import { apiClient } from "@/lib/apiclient";
import { Product, productSchema } from "@/models/zodSchema/product.schema";
import {z} from "zod";

export const getProducts = async () => {
    const response = await apiClient.get<Product[]>("/product");
    return z.array(productSchema).parse(response.data);
}