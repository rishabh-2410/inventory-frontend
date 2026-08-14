import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "@/services/category.service";
import { queryClient } from "@/lib/queryclient";
import { Category } from "@/models/zodSchema/category.schema";
import { queryKeys } from "@/lib/queryKeys";

export const useDeleteCategory = () => {
    return useMutation({
        mutationFn: (categoryId: string) => deleteCategory(categoryId),
        onMutate: async (categoryId) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.categories });
            const previousCategories = queryClient.getQueryData<Category[]>(queryKeys.categories);
            queryClient.setQueryData(queryKeys.categories, (old: Category[] = []) => old.filter((item) => item.id !== categoryId));
            return { previousCategories };
        },
        onError: (error, variables, context) => {
            console.log("error deleting category", error);
            queryClient.setQueryData(queryKeys.categories, context?.previousCategories);
        },
        onSettled: (data, error, variables, context) => {
            if (error) {
                queryClient.setQueryData(queryKeys.categories, context?.previousCategories);
            }
            queryClient.invalidateQueries({ queryKey: queryKeys.categories });
        },
    });
}