export const shouldRefreshToken = (expiresAt: string | null) => {
    if (!expiresAt) return true;

    const TWO_MINUTES_IN_MS = 2 * 60 * 1000;
    return new Date(expiresAt).getTime() - new Date().getTime() < TWO_MINUTES_IN_MS;
}