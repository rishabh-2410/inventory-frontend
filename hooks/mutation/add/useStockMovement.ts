import { useMutation } from "@tanstack/react-query";
import { registerStockMovement } from "@/services/stock.service";



export const useStockMovement = () => {
   return useMutation({
    mutationFn: registerStockMovement,
  });
}