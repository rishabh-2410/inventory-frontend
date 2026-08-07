import { queryKeys } from "@/lib/queryKeys"
import { StockMovementFilters } from "@/models/types/stockmovementfilter.type"
import { getStockMovementHistory } from "@/services/stock.service"
import { useInfiniteQuery } from "@tanstack/react-query"

export const useStockMovmentHistory = (filters: StockMovementFilters) => {
    return useInfiniteQuery({
        queryKey: queryKeys.stockMovements(filters),
        queryFn: ({ pageParam }: { pageParam: number }) => getStockMovementHistory({...filters, page: pageParam}),
        getNextPageParam: (lastPage) => {
            if (!lastPage.has_next) {
                return undefined;
            }
            return lastPage.page + 1;
        },
        initialPageParam: 1,
    })
}