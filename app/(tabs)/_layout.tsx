import { useAuthStore } from "@/store/auth.store";
import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isSignedIn = !!accessToken

  if (!isSignedIn) {
    return <Redirect href="/(auth)/login" />;
  }


  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarShowLabel: false,

          tabBarStyle: {
            position: "absolute",
            marginBottom: 30,
            marginHorizontal: 30,
            height: 56,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 10,
            borderRadius: 28,

            elevation: 0,

            backgroundColor: "transparent",
            borderTopWidth: 0,  // ← Add this to remove the line
            shadowColor: "#000",

            shadowOpacity: 0.12,

            shadowRadius: 24,

            shadowOffset: {
              width: 0,
              height: 10,
            },
          },

          tabBarActiveTintColor: "#EA7A53",

          tabBarInactiveTintColor: "#6B7280",
        }}
      >
        <Tabs.Screen
          name="index"
        // options={{
        //   tabBarIcon: ({ color, focused }) => (
        //     <Ionicons
        //       name={
        //         focused ? "home" : "home-outline"
        //       }
        //       size={26}
        //       color={color}
        //     />
        //   ),
        // }}
        />

        <Tabs.Screen
          name="inventory"
        // listeners={{
        //   tabPress: (e: any) => {
        //     e.preventDefault()
        //     addBottomSheetRef.current?.present()
        //   }
        // }}
        // options={{
        //   tabBarIcon: ({color, focused}) => (

        //       <Ionicons
        //         name="add-circle-outline"
        //         size={30}
        //         color={color}

        //       />

        //   ),
        // }}
        />
        <Tabs.Screen
          name="movement"
        />

        <Tabs.Screen
          name="history"
        />

        <Tabs.Screen
          name="more"
        // options={{
        //   tabBarIcon: ({ color, focused }) => (
        //     <Ionicons
        //       name={
        //         focused
        //           ? "settings"
        //           : "settings-outline"
        //       }
        //       size={26}
        //       color={color}
        //     />
        //   ),
        // }}
        />
      </Tabs>
    </>
  );
}
