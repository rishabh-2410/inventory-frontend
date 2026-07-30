import { Redirect} from "expo-router";

export default function AppIndex() {

    const isSignedIn = true

    if (isSignedIn) {
        return <Redirect href="/(tabs)" />
    }

    return <Redirect href="/(auth)/login" />
   
}