import { InventoryFilters } from "@/models/types/inventoryFilters";
import { StockMovementFilters } from "@/models/types/stockmovementfilter.type";

export const queryKeys = {
    users: ["users"],

    dashboard: (businessID: string) => ["dashboard", businessID],

    products: ["products"],
    product: (id: string) => ["product", id],

    categories: ["categories"],

    warehouses: ["warehouses"],

    inventory: (filters: InventoryFilters) => ["inventory", filters],
    inventoryStats: ["inventoryStats"],

    stockMovements: (businessID: string, filters: StockMovementFilters) => ["stockMovements", businessID, filters],
};