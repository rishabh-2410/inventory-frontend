import { useMutation } from "@tanstack/react-query";
import { AddWarehouseRequest, Warehouse } from "@/models/zodSchema/warehouse.schema";
import { addWarehouse } from "@/services/warehouse.service";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";


export const useAddWarehouse = () => {
    return useMutation({
        mutationFn: (data: AddWarehouseRequest) => addWarehouse(data),
        onMutate: (data: AddWarehouseRequest) => {
                const previousWarehouses = queryClient.getQueryData(queryKeys.warehouses);
                const optimisticWarehouse: Warehouse = {
                    id: "optimistic-warehouse-id",
                    business_id: "optimistic-business-id",
                    name: data.name,
                    address: data.address,
                };
                queryClient.setQueryData(queryKeys.warehouses, (old: Warehouse[]= []) => [...old, optimisticWarehouse]);
                return { previousWarehouses, optimisticWarehouse };
        },
        onError: (error, data, context) => {
            queryClient.setQueryData(queryKeys.warehouses, context?.previousWarehouses);
        },
       onSettled: (data, error, variables, context) => {
        if (error) {
            queryClient.setQueryData(queryKeys.warehouses, context?.previousWarehouses);
            return;
        } 
        queryClient.invalidateQueries({ queryKey: queryKeys.warehouses });
    },
});
};