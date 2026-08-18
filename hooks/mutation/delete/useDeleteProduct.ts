import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/services/product.service";
import { queryClient } from "@/lib/queryclient";
import { Product } from "@/models/zodSchema/product.schema";
import { queryKeys } from "@/lib/queryKeys";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/lib/api-error";


export const useDeleteProduct = () => {
    return useMutation({
        mutationFn: (productId: string) => deleteProduct(productId),
        onMutate: async (productId) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.products });
            const previousProducts = queryClient.getQueryData<Product[]>(queryKeys.products);
            queryClient.setQueryData(queryKeys.products, (old: Product[] = []) => old.filter((item) => item.id !== productId));
            return { previousProducts };
        },
        onError: (error, variables, context) => {
            Toast.show({
                type: "error",
                text1: "Error deleting product",
                text2: getApiErrorMessage(error, "Please try again"),
                position: "bottom",
                visibilityTime: 3000,
                autoHide: true,
            });
            queryClient.setQueryData(queryKeys.products, context?.previousProducts);
        },
        onSettled: (data, error, variables, context) => {
            if (error) {
                queryClient.setQueryData(queryKeys.products, context?.previousProducts);
            }
            queryClient.invalidateQueries({ queryKey: queryKeys.products });
        },
    });
}