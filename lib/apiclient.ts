import axios, { create } from "axios";
import { router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';

export const apiClient = create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
})

apiClient.interceptors.request.use(async (config) => {
    const token = await SecureStore.getItemAsync('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        switch(error.response?.status) {
            case 401:
                Toast.show({
                    type: 'error',
                    text1: 'Unauthorized',
                    position: "bottom"
                });
                router.navigate('/login');
                break;
            case 403:
                Toast.show({
                    type: 'error',
                    text1: 'Forbidden',
                    position: "bottom"
                });
                router.navigate('/login');
                break;
            case 500:
                Toast.show({
                    type: 'error',
                    text1: 'Internal Server Error',
                    position: "bottom"
                });
                router.navigate('/');
            default:
                break;
        }
        return Promise.reject(error);
    }

)
