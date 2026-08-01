import { create } from "zustand";
import { User } from "@/models/types/auth.type";

type AuthStore = {
    user: User | null;
    accessToken: string | null;

    setSession: (user: User, accessToken: string) => void;
    clearSession: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    accessToken: null,

    setSession: (user, accessToken) => set({
        user, 
        accessToken
    }),
    clearSession: () => set({
        user: null, 
        accessToken: null
    })
}))

