import { useAuthStore } from "@/store/auth.store";
import { Redirect, Tabs } from "expo-router";
import { Text, View } from "react-native";

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
          tabBarShowLabel: true,
          tabBarStyle: {
            position: "absolute",
            marginHorizontal: 20,
            bottom: 20,
            height: 70,
            paddingHorizontal: 12,
            backgroundColor: "rgba(255,255,255,0.72)",
            borderTopWidth: 1,
            borderTopColor: "rgba(255,255,255,0.9)",
            borderWidth: 1,
            borderColor: "rgba(255,255,255,0.65)",
            borderRadius: 28,
            elevation: 0,
            shadowColor: "#8AA3B8",
            shadowOpacity: 0.18,
            shadowRadius: 24,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            overflow: "hidden",
          },
          tabBarItemStyle: {
            borderRadius: 18,
            marginHorizontal: 2,
            paddingVertical: 4,
          },
          tabBarActiveTintColor: "#0B7A4D",
          tabBarInactiveTintColor: "#6F7C8E",
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "500",
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dashboard",
            // tabBarLabel: ({ focused, color }) => (
            //   <View
            //     style={{
            //       minWidth: 80,
            //       alignItems: "center",
            //       justifyContent: "center",
            //       borderRadius: 18,
            //       backgroundColor: focused ? "rgba(255,255,255,0.58)" : "transparent",
            //       borderWidth: focused ? 1 : 0,
            //       borderColor: focused ? "rgba(255,255,255,0.82)" : "transparent",
            //       paddingHorizontal: 6,
            //       paddingVertical: 4,
            //       shadowColor: focused ? "#AFC1D1" : "transparent",
            //       shadowOpacity: focused ? 0.2 : 0,
            //       shadowRadius: focused ? 12 : 0,
            //       shadowOffset: {
            //         width: 0,
            //         height: 6,
            //       },
            //     }}
            //   >
            //     <Text
            //       style={{
            //         color,
            //         fontSize: 13,
            //         fontWeight: "500",
            //       }}
            //     >
            //       Dashboard
            //     </Text>
            //   </View>
            // ),
          }}
        />

        <Tabs.Screen
          name="inventory"
          options={{
            title: "Inventory",
          }}
        />
        <Tabs.Screen
          name="movement"
          options={{
            title: "Movement",
          }}
        />

        <Tabs.Screen
          name="history"
          options={{
            title: "History",
          }}
        />

        <Tabs.Screen
          name="more"
          options={{
            title: "More",
            tabBarItemStyle: {
            paddingTop: 4,
            paddingRight: 4,
            }

          }}
        />
      </Tabs>
    </>
  );
}
