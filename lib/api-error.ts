import { isAxiosError } from "axios";

export function getApiErrorMessage(error: unknown, fallback: string): string {
    if (!isAxiosError(error)) {
        return fallback;
    }

    const data = error.response?.data;
    if (typeof data === "string") {
        const message = data.trim();
        if (message) return message;
    }

    return fallback;
}
