import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen
        name="setup-business"
        options={{
          animation: 'fade_from_bottom',
        }}
      />
    </Stack>
  );
}   
