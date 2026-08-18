import { useMutation } from "@tanstack/react-query";
import { deleteWarehouse } from "@/services/warehouse.service";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";
import { Warehouse } from "@/models/zodSchema/warehouse.schema";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/lib/api-error";

export const useDeleteWarehouse = () => {
    return useMutation({
        mutationFn: (warehouseId: string) => deleteWarehouse(warehouseId),
        onMutate: async (warehouseId) => {
            await queryClient.cancelQueries({ queryKey: queryKeys.warehouses });
            const previousWarehouses = queryClient.getQueryData<Warehouse[]>(queryKeys.warehouses);
            queryClient.setQueryData(queryKeys.warehouses, (old: Warehouse[] = []) => old.filter((item) => item.id !== warehouseId));
            return { previousWarehouses };
        },
        onError: (error, variables, context) => {
            Toast.show({
                type: "error",
                text1: "Error deleting warehouse",
                text2: getApiErrorMessage(error, "Please try again"),
                position: "bottom",
                visibilityTime: 3000,
                autoHide: true,
            });
            queryClient.setQueryData(queryKeys.warehouses, context?.previousWarehouses);
        },
        onSettled: (data, error, variables, context) => {
            if (error) {
                queryClient.setQueryData(queryKeys.warehouses, context?.previousWarehouses);
            }
            queryClient.invalidateQueries({ queryKey: queryKeys.warehouses });
        },
    });
}