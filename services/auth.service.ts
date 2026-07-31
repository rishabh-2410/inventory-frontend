import { apiClient } from "@/lib/apiclient";
import { LoginRequest, LoginResponse } from "@/models/types/auth.type";

export async function loginUser(request: LoginRequest) {
    const response = await apiClient.post('/auth/login', request)
    return response.data as LoginResponse
}