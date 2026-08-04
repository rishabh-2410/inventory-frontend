import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/queryKeys";
import { getInventoryStats } from "@/services/dashboard.service";

export const useInventoryStats = () => {
    return useQuery({
        queryKey: queryKeys.inventoryStats,
        queryFn: getInventoryStats,
    })
}