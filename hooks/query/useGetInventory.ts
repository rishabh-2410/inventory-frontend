import { queryKeys } from "@/lib/queryKeys"
import { InventoryFilters } from "@/models/types/inventoryFilters"
import { getInventory } from "@/services/stock.service"
import { useQuery } from "@tanstack/react-query"

export const useGetInventory = (filters: InventoryFilters) => {
    return useQuery({
        queryKey: queryKeys.inventory(filters),
        queryFn: () => getInventory(filters),
        placeholderData: (previousData) => previousData,
    })
}