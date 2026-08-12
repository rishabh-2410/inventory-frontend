import { useMutation } from "@tanstack/react-query";
import { editProduct, EditProductRequest } from "@/services/product.service";

export const useEditProduct = () => {
    return useMutation({
        mutationFn: ({ productId, request }: { productId: string; request: EditProductRequest }) =>
            editProduct(productId, request)
    })
}
