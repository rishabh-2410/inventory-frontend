import { apiClient } from "@/lib/apiclient";
import { LoginRequest } from "@/models/types/auth.type";
import { loginResponseSchema } from "@/models/zodSchema/login.schema";
import { RegisterUserRequest, registerUserResponseSchema,  } from "@/models/zodSchema/register.schema";

export async function loginUser(request: LoginRequest) {
    const response = await apiClient.post('/auth/login', request)
    return loginResponseSchema.parse(response.data);
}


export async function registerUser(request: RegisterUserRequest) {
    const response = await apiClient.post('/auth/register', request)
    return registerUserResponseSchema.parse(response.data);
}


export async function refreshUserToken(refreshToken: string) {
    const response = await apiClient.post('/auth/refresh', {
        refresh_token: refreshToken,
    });
    return loginResponseSchema.parse(response.data);
}