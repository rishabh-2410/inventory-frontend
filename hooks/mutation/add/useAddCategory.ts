import { useMutation } from "@tanstack/react-query";
import { addCategory } from "@/services/category.service";
import { AddCategoryRequest, Category } from "@/models/zodSchema/category.schema";
import { queryKeys } from "@/lib/queryKeys";
import { queryClient } from "@/lib/queryclient";
import { uuidv4 } from "zod";

export const useAddCategory = () => {
    return useMutation({
        mutationFn: (request: AddCategoryRequest) => addCategory(request),
        onMutate: (request) => {
            const previousCategories = queryClient.getQueryData<Category[]>(queryKeys.categories);
            const optimisticCategory = {
                id: uuidv4().toString(),
                name: request.name,
                description: request.description,
            };
            queryClient.setQueryData(queryKeys.categories, (old: Category[] = []) => [...old, optimisticCategory]);
            return { previousCategories, optimisticCategory };
        },
        onSettled: (data, error, variables, context) => {
            if (error) {
                console.error("Error adding category", error);
                queryClient.setQueryData(queryKeys.categories, context?.previousCategories);
            }
            queryClient.invalidateQueries({ queryKey: queryKeys.categories });
        },
    });
}