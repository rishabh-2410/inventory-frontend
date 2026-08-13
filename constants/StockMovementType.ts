export const stockMovementType = [
    "RECEIVE",
    "SALE",
    "RETURN",
    "DAMAGE",
] as const;


// Below line is for type safety. Since the above array is `readOnly` due to `as const`, it is not an array of strings (string[])
// Typescript creates a union type with the values of the array. Eg: StockMovementType = "RECEIVE" | "SELL" | "RETURN" | "DAMAGE"
/**
 * @description The type of stock movement
 * @example
 * const stockMovementType: StockMovementType = "RECEIVE";
 * const stockMovementType: StockMovementType = "SELL";
 * const stockMovementType: StockMovementType = "RETURN";
 * const stockMovementType: StockMovementType = "DAMAGE";
 */
export type StockMovementType = (typeof stockMovementType)[number];