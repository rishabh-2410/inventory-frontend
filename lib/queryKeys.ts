import { InventoryFilters } from "@/models/types/inventoryFilters";
import { StockMovementFilters } from "@/models/types/stockmovementfilter.type";

export const queryKeys = {
    dashboard: ["dashboard"],

    products: ["products"],
    product: (id: string) => ["product", id],

    categories: ["categories"],

    warehouses: ["warehouses"],

    inventory: (filters: InventoryFilters) => ["inventory", filters],
    inventoryStats: ["inventoryStats"],

    stockMovements: (filters: StockMovementFilters) => ["stockMovements", filters],
};