import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { router } from "expo-router";

const sections = [
  {
    title: "Agreement",
    body: "By creating an account or signing in, you agree to use Invento Pro only for managing inventory, warehouses, and stock movements for your organization. If you do not agree, do not use the app.",
  },
  {
    title: "Accounts and access",
    body: "You are responsible for keeping login credentials confidential and for activity under your account. Owners invite employees and assign roles. Employees may only use features their role allows. We may suspend access that appears abusive, shared without permission, or used to harm another organization.",
  },
  {
    title: "Your content",
    body: "Products, categories, warehouses, employees, and stock records belong to your business. You grant us a limited license to store and display that data so the app can operate. You must not enter data you are not authorized to process.",
  },
  {
    title: "Acceptable use",
    body: "Do not reverse engineer the service, probe other tenants' data, overload the API, or use the app for unlawful activity. Inventory records must reflect genuine business operations. Automated scraping or unauthorized bulk export is not permitted.",
  },
  {
    title: "Availability",
    body: "We aim for reliable uptime but do not guarantee uninterrupted service. Features may change as we improve the product. Session expiry, network issues, or maintenance can briefly interrupt access.",
  },
  {
    title: "Liability",
    body: "Invento Pro is provided as-is for operational inventory tracking. We are not liable for stock discrepancies, business losses, or decisions made from dashboard figures. You remain responsible for physical inventory counts and compliance in your jurisdiction.",
  },
  {
    title: "Termination",
    body: "You may stop using the app at any time by logging out and asking your owner to deactivate your account. We may terminate access if these terms are violated. After termination, local session data on this device is cleared.",
  },
];

export default function TermsOfServiceScreen() {
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
        <Text className="text-[18px] font-inter-bold text-[#171a21]">Terms of Service</Text>
        <View className="h-10 w-10" />
      </View>

      <ScrollView
        className="flex-1 bg-[#f6f8fb]"
        contentContainerClassName="px-6 pb-10 pt-6"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[28px] font-inter-bold text-[#171a21]">Using Invento Pro</Text>
        <Text className="mt-2 text-[15px] font-inter-regular leading-6 text-[#7a8596]">
          Last updated August 23, 2026. These terms govern access to Invento Pro on this device.
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
