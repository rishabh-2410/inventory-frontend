import { apiClient } from "@/lib/apiclient";
import { LoginRequest, LoginResponse } from "@/models/types/auth.type";
import { RegisterUserRequest, RegisterUserResponse } from "@/models/zodSchema/register.schema";

export async function loginUser(request: LoginRequest) {
    const response = await apiClient.post('/auth/login', request)
    return response.data as LoginResponse;
}


export async function registerUser(request: RegisterUserRequest) {
    const response = await apiClient.post('/auth/register', request)
    return response.data as RegisterUserResponse;
}