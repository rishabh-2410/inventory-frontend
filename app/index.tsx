import { useAuthStore } from "@/store/auth.store";
import { Redirect} from "expo-router";

export default function AppIndex() {
    const accessToken = useAuthStore((state) => state.accessToken);
    const isSignedIn = !!accessToken
    if (isSignedIn) {
        return <Redirect href="/(tabs)" />
    }

    return <Redirect href="/(auth)/register" />
   
}