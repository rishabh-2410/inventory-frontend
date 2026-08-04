import { z } from "zod";

export const loginRequestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
})

export const loginResponseSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    access_token: z.string(),
    refresh_token: z.string(),  
    access_token_expires_at: z.string(),
    role: z.enum(["owner", "employee"]),
    is_active: z.boolean(),
    business_id: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
})