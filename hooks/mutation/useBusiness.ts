import { registerBusiness } from "@/services/business.service";
import { useMutation } from "@tanstack/react-query";


export function useRegisterBusiness() {
    return useMutation({
        mutationFn: registerBusiness
    })
}