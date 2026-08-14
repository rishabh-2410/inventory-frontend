import { useMutation } from "@tanstack/react-query";
import { UpdateWarehouseRequest, Warehouse } from "@/models/zodSchema/warehouse.schema";
import { updateWarehouse } from "@/services/warehouse.service";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";

export const useEditWarehouse = () => {
    return useMutation({
        mutationFn: ({ warehouseID, payload}: {warehouseID: string, payload: UpdateWarehouseRequest}) => updateWarehouse(warehouseID, payload),
        onMutate: ({ warehouseID, payload}) => {
            const previousWarehouses = queryClient.getQueryData<Warehouse[]>(queryKeys.warehouses);
            const optimisticWarehouse = {
                ...previousWarehouses?.find((warehouse) => warehouse.id === warehouseID),
                ...payload,
            };
            queryClient.setQueryData(queryKeys.warehouses, (old: Warehouse[]= []) => old.map((warehouse) => warehouse.id === warehouseID ? optimisticWarehouse : warehouse));
            return { previousWarehouses, optimisticWarehouse };
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(queryKeys.warehouses, context?.previousWarehouses);
        },
        onSettled: (data, error, variables, context) => {
            if (error) {
                console.error("Error editing warehouse", error);
                queryClient.setQueryData(queryKeys.warehouses, context?.previousWarehouses);
                return;
            }
            queryClient.invalidateQueries({ queryKey: queryKeys.warehouses });
        },
    });
};