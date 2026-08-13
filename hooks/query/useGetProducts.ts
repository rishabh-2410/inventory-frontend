import { queryKeys } from "@/lib/queryKeys";
import { getProducts } from "@/services/product.service";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = () => {
    return useQuery({
        queryKey: queryKeys.products,
        queryFn: getProducts,
    });
}