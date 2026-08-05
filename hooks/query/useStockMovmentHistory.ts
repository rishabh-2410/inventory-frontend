import { queryKeys } from "@/lib/queryKeys"
import { StockMovementFilters } from "@/models/types/stockMovement.type"
import { getStockMovementHistory } from "@/services/stock.service"
import { useQuery } from "@tanstack/react-query"

export const useStockMovmentHistory = (filters: StockMovementFilters) => {
    return useQuery({
        queryKey: queryKeys.stockMovements(filters),
        queryFn: () => getStockMovementHistory(filters),
    })
}