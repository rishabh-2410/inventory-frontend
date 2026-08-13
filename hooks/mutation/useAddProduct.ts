import { useMutation } from "@tanstack/react-query";
import { addProduct } from "@/services/product.service";
import { Product } from "@/models/zodSchema/product.schema";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";
import Toast from "react-native-toast-message";

export const useAddProduct = () => {
    return useMutation({
        mutationFn: addProduct,
        onMutate: async (newProduct) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.products });
            const previousProducts = queryClient.getQueryData<Product[]>(queryKeys.products);
            const optimisticProduct: Product = {
                id: `temp-${Date.now()}`,
                business_id: `temp-${Date.now()}`,
                ...newProduct,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }
            queryClient.setQueryData(queryKeys.products, (old: Product[] = []) => [optimisticProduct, ...old]);
            return { previousProducts, optimisticProduct };
        },
        onError: (error, newProduct, context) => {
            Toast.show({
                type: "error",
                text1: "Error adding product",
                position: "bottom",
                visibilityTime: 3000,
                autoHide: true,
            });
            queryClient.setQueryData(queryKeys.products, context?.previousProducts);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.products });
        },
    });
}