import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "@/services/category.service";
import { queryClient } from "@/lib/queryclient";
import { Category } from "@/models/zodSchema/category.schema";
import { queryKeys } from "@/lib/queryKeys";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/lib/api-error";

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
            Toast.show({
                type: "error",
                text1: "Error deleting category",
                text2: getApiErrorMessage(error, "Please try again"),
                position: "bottom",
                visibilityTime: 3000,
                autoHide: true,
            });
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