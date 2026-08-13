import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { getCategory } from "@/services/category.service";

export const useCategory = () => {
    return useQuery({
        queryKey: queryKeys.categories,
        queryFn: () => getCategory(),
    });
}