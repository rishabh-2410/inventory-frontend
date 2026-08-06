import { useMutation } from "@tanstack/react-query";
import { StockMovementRequest } from "@/models/zodSchema/stockMovement.schema";
import { registerStockMovement } from "@/services/stock.service";


export const useStockMovement = () => {
   return useMutation({
    mutationFn: registerStockMovement
   })
}