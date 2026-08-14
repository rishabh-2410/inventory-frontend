import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "@/services/category.service";
import { Category, UpdateCategoryRequest } from "@/models/zodSchema/category.schema";
import { queryKeys } from "@/lib/queryKeys";
import { queryClient } from "@/lib/queryclient";
import { uuidv4 } from "zod";

export const useEditCategory = () => {
    return useMutation({
        mutationFn: ({categoryID, payload}: {categoryID: string, payload: UpdateCategoryRequest}) => updateCategory(categoryID, payload),
        onMutate: ({categoryID, payload}: {categoryID: string, payload: UpdateCategoryRequest}) => {
            const previousCategories = queryClient.getQueryData<Category[]>(queryKeys.categories);
            const optimisticCategory = {
                id: uuidv4().toString(),
                name: payload.name,
                description: payload.description,
            };
            queryClient.setQueryData(queryKeys.categories, (old: Category[] = []) => old.map(item => item.id === categoryID ? optimisticCategory : item));
            return { previousCategories, optimisticCategory };
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(queryKeys.categories, context?.previousCategories);
        },
        onSettled: (data, error, variables, context) => {
            if (error) {
                console.error("Error editing category", error);
                queryClient.setQueryData(queryKeys.categories, context?.previousCategories);
            }
            queryClient.invalidateQueries({ queryKey: queryKeys.categories });
        },
    });
}