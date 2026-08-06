import { useAuthStore } from "@/store/auth.store";
import { create } from "axios";
import { router } from "expo-router";
import Toast from 'react-native-toast-message';

export const apiClient = create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
})

apiClient.interceptors.request.use(async (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // No response means request never reached the server
        if (!error.response) {
            if (error.code === "ECONNABORTED") {
                Toast.show({
                    type: "error",
                    text1: "Request timed out",
                    position: "bottom",
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Check your internet connection",
                    position: "bottom",
                });
            }
            return Promise.reject(error);
        }

        // Handle response errors
        switch (error.response?.status) {
            case 401:
                Toast.show({
                    type: "error",
                    text1: "Your session has expired",
                    position: "bottom"
                });
                router.replace('/login');
                break;
            case 403:
                Toast.show({
                    type: "error",
                    text1: "You don't have permission to perform this action",
                    position: "bottom"
                });
                break;
            default:
                // Let caller decided how to handle 400, 404, 500, etc.
                break;
        }
        return Promise.reject(error);

    }
)
