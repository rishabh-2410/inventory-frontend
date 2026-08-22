import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { router } from "expo-router";

const topics = [
  {
    title: "Logging stock movements",
    body: "Open Movement, choose Receive or Issue, pick a product and warehouse, enter quantity, then confirm. The change appears in History and updates inventory totals.",
  },
  {
    title: "Products, categories, and warehouses",
    body: "Owners can manage catalogs from Settings. Add items from the list screens. New records show up in pickers after the lists refresh.",
  },
  {
    title: "Roles",
    body: "Owners can manage employees and organization data. Employees can log movements and view inventory for the business they belong to.",
  },
  {
    title: "Session expired",
    body: "If you see a session expired message, sign in again. Stay signed in by keeping the app in use; a refresh token restores your session when you reopen the app.",
  },
];

export default function HelpCenterScreen() {
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
        <Text className="text-[18px] font-inter-bold text-[#171a21]">Help Center</Text>
        <View className="h-10 w-10" />
      </View>

      <ScrollView
        className="flex-1 bg-[#f6f8fb]"
        contentContainerClassName="px-6 pb-10 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[28px] font-inter-bold text-[#171a21]">How can we help?</Text>
        <Text className="mt-2 text-[15px] font-inter-regular leading-6 text-[#7a8596]">
          Short guides for the screens you use every day. Need more? Ask your organization owner.
        </Text>

        {topics.map((topic) => (
          <View
            key={topic.title}
            className="mt-5 rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5"
          >
            <Text className="text-[16px] font-inter-semibold text-[#171a21]">{topic.title}</Text>
            <Text className="mt-2 text-[15px] font-inter-regular leading-6 text-[#7a8596]">
              {topic.body}
            </Text>
          </View>
        ))}

        <View className="mt-5 rounded-[22px] bg-[#0b7a4d] px-5 py-6">
          <Text className="text-[16px] font-inter-semibold text-white">Still stuck?</Text>
          <Text className="mt-2 text-[15px] font-inter-regular leading-6 text-[#d5efe4]">
            Contact your workspace owner, or email niko.mak1024@gmail.com with the screen name and what you expected to happen.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
