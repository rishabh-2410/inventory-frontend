import { apiClient } from "@/lib/apiclient";
import { useAuthStore } from "@/store/auth.store";
import { getRefreshToken, saveRefreshToken } from "@/store/token.store";

export async function restoreSession() {

    const {setSession, clearSession} = useAuthStore.getState();

    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
        clearSession();
        return;
    }

    try {
        const response = await apiClient.get('/auth/refresh');
        await saveRefreshToken(response.data.refresh_token);
        setSession(response.data.user, response.data.access_token, response.data.refresh_token, response.data.access_token_expires_at);
    } catch (error) {
        console.error('Error restoring session:', error);
        clearSession();
        return null;
    }
}