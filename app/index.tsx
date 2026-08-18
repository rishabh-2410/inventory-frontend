import { useOnboardingStatus } from "@/hooks/useOnboardingStatus";
import { useAuthStore } from "@/store/auth.store";
import { DefaultTheme, Redirect} from "expo-router";
import { ActivityIndicator } from "react-native";

export default function AppIndex() {
    const isOnboarded = useOnboardingStatus()
    const accessToken = useAuthStore((state) => state.accessToken);
    const isSignedIn = !!accessToken

    if (isOnboarded === null) {
        return <ActivityIndicator size="large" color={DefaultTheme.colors.primary} className="flex-1 justify-center items-center" />
    }

    if (!isOnboarded) {
        return <Redirect href="/onboarding" />
    }

    if (isSignedIn) {
        return <Redirect href="/(tabs)" />
    }


    return <Redirect href="/(auth)/register" />
   
}