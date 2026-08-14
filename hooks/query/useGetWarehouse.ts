import { useQuery } from "@tanstack/react-query";
import { getWarehouses } from "@/services/warehouse.service";
import { queryKeys } from "@/lib/queryKeys";

export const useGetWarehouses = () => {
    return useQuery({
        queryKey: queryKeys.warehouses,
        queryFn: getWarehouses,
    });
}