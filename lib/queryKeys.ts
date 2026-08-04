export const queryKeys = {
    dashboard: ["dashboard"],

    products: ["products"],
    product: (id: string) => ["product", id],

    categories: ["categories"],

    warehouses: ["warehouses"],

    inventory: ["inventory"],
    inventoryStats: ["inventoryStats"],

    stockMovements: ["stockMovements"],
};