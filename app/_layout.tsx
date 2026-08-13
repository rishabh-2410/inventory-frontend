import "../global.css";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashScreen, Stack, ThemeProvider, DefaultTheme } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
// import { useFonts } from 'expo-font';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

// import { useEffect, useState } from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from '@/lib/queryclient';
import { useAuthStore, useHasHydrated } from "@/store/auth.store";
import { useEffect, useState, useRef } from "react";
import { ActivityIndicator } from "react-native";
import { useSessionRefresh } from "@/hooks/useSessionRefrest";
import { refreshUserToken } from "@/services/auth.service";


// import {
//   LeagueSpartan_300Light,
//   LeagueSpartan_400Regular,
//   LeagueSpartan_500Medium,
//   LeagueSpartan_600SemiBold,
//   LeagueSpartan_700Bold,
//   LeagueSpartan_800ExtraBold,
// } from "@expo-google-fonts/league-spartan";
// import { useAuthStore } from '@/store/auth.store';


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const isSignedIn = !!accessToken
  const hasHydrated = useHasHydrated();
  const [isRestoring, setIsRestoring] = useState(false);
  const hasRestoredRef = useRef(false);

  useSessionRefresh();

  // Restore session if refresh token is present and hydration is completed.
  useEffect(() => {
    if (!hasHydrated) return;
    if (!refreshToken) return;
    if (hasRestoredRef.current) return;
  
    hasRestoredRef.current = true;
  
    const restoreSession = async () => {
      try {
        setIsRestoring(true);
  
        const response = await refreshUserToken(refreshToken);
  
        const user = {
          id: response.id,
          name: response.name,
          email: response.email,
          role: response.role as "owner" | "employee",
          is_active: response.is_active,
          business_id: response.business_id,
          created_at: response.created_at,
        };
  
        useAuthStore.getState().setSession(
          user,
          response.access_token,
          response.refresh_token,
          response.access_token_expires_at
        );
      } catch (err) {
        console.error(err);
        useAuthStore.getState().clearSession();
      } finally {
        setIsRestoring(false);
      }
    };
  
    restoreSession();
  }, [hasHydrated, refreshToken]);

  useEffect(() => {
     if(hasHydrated && !isRestoring) {
      SplashScreen.hideAsync();
     }
  }, [hasHydrated, isRestoring])

  if (!hasHydrated || isRestoring) {
    return <ActivityIndicator size="large" color={DefaultTheme.colors.primary} className="flex-1 justify-center items-center" />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <BottomSheetModalProvider>
          <ThemeProvider value={DefaultTheme}>
            <Stack
              key={isSignedIn ? "app-stack" : "auth-stack"}
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="index" />
              {isSignedIn ? (
                <Stack.Screen name="(tabs)" />
              ) : (
                <Stack.Screen name="(auth)" />
              )}
            </Stack>
            <StatusBar style="dark" />
            <Toast />
          </ThemeProvider>
        </BottomSheetModalProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
