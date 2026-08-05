import { apiClient } from "@/lib/apiclient"
import { InventoryFilters } from "@/models/types/inventoryFilters"
import { StockMovementFilters } from "@/models/types/stockMovement.type"
import { Inventory, inventorySchema } from "@/models/zodSchema/inventory.schema"
import { StockMovementHistory, stockMovementHistorySchema } from "@/models/zodSchema/stockMovementHistory.schema"
import {z} from "zod"

export const getStockMovementHistory = async(filters: StockMovementFilters) => {
    const response = await apiClient.get<StockMovementHistory[]>(`/stock-movement`, { params: filters })
    return z.array(stockMovementHistorySchema).parse(response.data)
}



export const getInventory = async(filters: InventoryFilters) => {
    const response = await apiClient.get<Inventory[]>(`/inventory`, { params: filters })
    return z.array(inventorySchema).parse(response.data)
}