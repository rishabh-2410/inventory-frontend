import { refreshUserToken } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { shouldRefreshToken } from "@/utils/refresh_helper";
import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";

export function useSessionRefresh() {
    const refreshToken = useAuthStore((state) => state.refreshToken);
    const expiresAt = useAuthStore((state) => state.accessTokenExpiresAt);

    useEffect(() => {
        const handleAppStateChange = async (nextState: AppStateStatus) => {
            if (nextState === 'active' && refreshToken) {
                if (!shouldRefreshToken(expiresAt)) {
                    return;
                }
                try {
                    const response = await refreshUserToken(refreshToken);
                    const user = {
                        id: response.id,
                        email: response.email,
                        name: response.name,
                        role: response.role as "owner" | "employee",
                        is_active: response.is_active,
                        business_id: response.business_id,
                        created_at: response.created_at,
                    }
                    useAuthStore.getState().setSession(user, response.access_token, response.refresh_token, response.access_token_expires_at);
                } catch (error) {
                    console.error(error);
                }
            }
        }

        const subscription = AppState.addEventListener('change', handleAppStateChange);
        return () => subscription.remove();
    }, [refreshToken, expiresAt])   
}
