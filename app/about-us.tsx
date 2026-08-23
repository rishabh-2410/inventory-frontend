import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { router } from "expo-router";

const pillars = [
  {
    icon: "inventory-2" as const,
    title: "Built for the floor",
    body: "Invento Pro is made for people who receive, issue, and count stock every shift — not just for dashboards in an office.",
  },
  {
    icon: "sync-alt" as const,
    title: "One source of truth",
    body: "Every movement you log updates inventory and history in real time, so the whole team sees the same numbers.",
  },
  {
    icon: "verified-user" as const,
    title: "Role-aware access",
    body: "Employees can move stock and review inventory. Owners handle catalogs, warehouses, and who is on the team.",
  },
];

export default function AboutUsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center justify-between bg-white px-4 pb-3 pt-1">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center"
          hitSlop={8}
        >
          <MaterialIcons name="arrow-back" size={24} color="#171a21" />
        </Pressable>
        <Text className="text-[18px] font-inter-bold text-[#171a21]">About Us</Text>
        <View className="h-10 w-10" />
      </View>

      <ScrollView
        className="flex-1 bg-[#f6f8fb]"
        contentContainerClassName="px-6 pb-10 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center rounded-[28px] bg-[#0b7a4d] px-6 py-8">
          <View className="h-16 w-16 items-center justify-center rounded-[18px] bg-[#d5efe4]">
            <MaterialIcons name="inventory" size={32} color="#0b7a4d" />
          </View>
          <Text className="mt-4 text-center text-[26px] font-inter-bold text-white">Invento Pro</Text>
          <Text className="mt-2 text-center text-[15px] font-inter-regular leading-6 text-[#d5efe4]">
            Warehouse clarity in your pocket. Track every unit without leaving the floor.
          </Text>
        </View>

        <Text className="mt-8 text-[28px] font-inter-bold text-[#171a21]">Why we exist</Text>
        <Text className="mt-2 text-[15px] font-inter-regular leading-6 text-[#7a8596]">
          Stock goes missing when receive and issue live in notebooks and chats. Invento Pro gives your
          organization a simple place to log movements, see what is on hand, and trust the count.
        </Text>

        {pillars.map((pillar) => (
          <View
            key={pillar.title}
            className="mt-5 flex-row rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5"
          >
            <View className="mr-4 h-11 w-11 items-center justify-center rounded-xl bg-[#e8f3ed]">
              <MaterialIcons name={pillar.icon} size={22} color="#0b7a4d" />
            </View>
            <View className="flex-1">
              <Text className="text-[16px] font-inter-semibold text-[#171a21]">{pillar.title}</Text>
              <Text className="mt-2 text-[15px] font-inter-regular leading-6 text-[#7a8596]">
                {pillar.body}
              </Text>
            </View>
          </View>
        ))}

        <View className="mt-5 rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
          <Text className="text-[16px] font-inter-semibold text-[#171a21]">Your role here</Text>
          <Text className="mt-2 text-[15px] font-inter-regular leading-6 text-[#7a8596]">
            As an employee you keep inventory honest: receive inbound stock, issue what leaves, and
            check History when something looks off. Your owner invites you and sets up products,
            categories, and warehouses.
          </Text>
        </View>

        <Text className="mt-8 text-center text-[12px] font-inter-regular text-[#98a2b3]">
          Invento Pro · Version 2.4.1
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
