import { apiClient } from "@/lib/apiclient"
import { StockMovementFilters } from "@/models/types/stockMovement.type"
import { StockMovementHistory, stockMovementHistorySchema } from "@/models/zodSchema/stockMovementHistory.schema"
import {z} from "zod"

export const getStockMovementHistory = async(filters: StockMovementFilters) => {
    const response = await apiClient.get<StockMovementHistory[]>(`/stock-movement`, { params: filters })
    return z.array(stockMovementHistorySchema).parse(response.data)
}