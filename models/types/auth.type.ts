import {z} from "zod";
import { loginRequestSchema, loginResponseSchema } from '@/models/zodSchema/login.schema'



// AUTH TYPES
export type LoginRequest = z.infer<typeof loginRequestSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>

export type User = {
    id: string;
    name: string;
    role: "owner" | "employee";
    is_active: boolean;
    business_id: string | null;
    email: string;
    created_at: string;
}


export type RegisterBusinessRequest = {
    name: string;
    address: string;
    email: string;
    user_id: string;
}