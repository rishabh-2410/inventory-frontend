import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { router } from "expo-router";

const sections = [
  {
    title: "Information we collect",
    body: "We collect the account details you provide (name, email, role), business and warehouse data you enter, and session tokens used to keep you signed in. Device identifiers are not sold to third parties.",
  },
  {
    title: "How we use your data",
    body: "Your data is used to authenticate access, store inventory records, record stock movements, and show dashboards for your business. We process data only to operate Inventory Flow for your organization.",
  },
  {
    title: "Storage and security",
    body: "Access tokens are kept in memory during a session. Refresh tokens are stored in the device secure store. API traffic uses authenticated requests. You can end a session at any time from Settings.",
  },
  {
    title: "Sharing",
    body: "We do not sell personal information. Data stays within your business account. Employees see only what their role allows. We may disclose information if required by law.",
  },
  {
    title: "Your choices",
    body: "You may update profile details through your organization owner, request deletion of account data from your administrator, and log out to clear the local session on this device.",
  },
];

export default function PrivacyPolicyScreen() {
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
        <Text className="text-[18px] font-inter-bold text-[#171a21]">Privacy Policy</Text>
        <View className="h-10 w-10" />
      </View>

      <ScrollView
        className="flex-1 bg-[#f6f8fb]"
        contentContainerClassName="px-6 pb-10 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[28px] font-inter-bold text-[#171a21]">Your data, clearly</Text>
        <Text className="mt-2 text-[15px] font-inter-regular leading-6 text-[#7a8596]">
          Last updated August 23, 2026. This policy explains how Inventory Flow handles information on this app.
        </Text>

        {sections.map((section) => (
          <View
            key={section.title}
            className="mt-5 rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5"
          >
            <Text className="text-[16px] font-inter-semibold text-[#171a21]">{section.title}</Text>
            <Text className="mt-2 text-[15px] font-inter-regular leading-6 text-[#7a8596]">
              {section.body}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
