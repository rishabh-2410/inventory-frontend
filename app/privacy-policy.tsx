import {Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#f6f8fb]">
      <Text className="px-6 text-[22px] font-inter-bold text-[#171a21]">Privacy Policy</Text>
    </SafeAreaView>
  );
}