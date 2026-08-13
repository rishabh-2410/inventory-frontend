import { useMutation } from "@tanstack/react-query";
import { editProduct, EditProductRequest } from "@/services/product.service";
import { queryClient } from "@/lib/queryclient";
import { Product } from "@/models/zodSchema/product.schema";
import { queryKeys } from "@/lib/queryKeys";

export const useEditProduct = () => {
    return useMutation({
        mutationFn: ({ productId, request }: { productId: string; request: EditProductRequest }) =>
            editProduct(productId, request),
        onMutate: ({productId, request}) => {

            const previousProducts = queryClient.getQueryData<Product[]>(queryKeys.products);

            const optimisticProduct = {
                ...previousProducts?.find((product) => product.id === productId),
                ...request,
            }

            queryClient.setQueryData(queryKeys.products, (old: Product[] = []) => {
                return old.map((product) => product.id === productId ? optimisticProduct : product);
            });

            return { previousProducts, optimisticProduct };
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(queryKeys.products, context?.previousProducts);
            return { error: error.message };
        },
        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries({ queryKey: queryKeys.products });
        },
    })
}
