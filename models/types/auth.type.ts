import {z} from "zod";
import { loginRequestSchema, loginResponseSchema } from "@/models/schemas/auth.schema";


// AUTH TYPES
export type LoginRequest = z.infer<typeof loginRequestSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>