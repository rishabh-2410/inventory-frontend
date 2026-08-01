import { apiClient } from "@/lib/apiclient";
import { RegisterBusinessRequest } from "@/models/types/auth.type";





export async function registerBusiness(request: RegisterBusinessRequest) {
    const response = await apiClient.post('/business', request);
    return response.status === 200;
}