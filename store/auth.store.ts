import { create } from "zustand";
import { User } from "@/models/types/auth.type";
import * as SecureStore from 'expo-secure-store';
import { persist, createJSONStorage } from "zustand/middleware";
import { useEffect, useState } from "react";


// SecureStore adapter for Zustand persist middleware
const secureStorage = {
    getItem: async (key: string) => {
        return await SecureStore.getItemAsync(key);
    },
    setItem: async (key: string, value: string) => {
        await SecureStore.setItemAsync(key, value);
    },
    removeItem: async (key: string) => {
        await SecureStore.deleteItemAsync(key);
    },
};


type AuthStore = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpiresAt: string | null;    

    setSession: (user: User, accessToken: string, refreshToken: string, accessTokenExpiresAt: string) => void;
    clearSession: () => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            accessTokenExpiresAt: null,

            setSession: (user, accessToken, refreshToken, accessTokenExpiresAt) => set({
                user,
                accessToken,
                refreshToken,
                accessTokenExpiresAt,
            }),

            clearSession: () => set({
                user: null,
                accessToken: null,
                refreshToken: null,
                accessTokenExpiresAt: null,
            }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => secureStorage),
            partialize: (state) => ({
                refreshToken: state.refreshToken,
            })
        }
    )
)



export const useHasHydrated = () => {
    const [hasHydrated, setHasHydrated] = useState(
        () => useAuthStore.persist.hasHydrated()
    );

    useEffect(() => {
        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setHasHydrated(true);
        });

        return () => unsubscribe();
    }, []);

    return hasHydrated;
};



