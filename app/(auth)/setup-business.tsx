import { router } from 'expo-router'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from '@/hooks/mutation/add/userRegister';
import { RegisterBusinessDetails, registerBusinessDetailsSchema } from '@/models/zodSchema/register.schema';
import Toast from 'react-native-toast-message';
import { useRegisterBusiness } from '@/hooks/mutation/add/useBusiness';
import { useTempStore } from '@/store/temp.store';
import { RegisterBusinessRequest } from '@/models/types/auth.type';



export default function SetupBusinessScreen() {

  const {control, handleSubmit, reset, formState: { errors }} = useForm<RegisterBusinessDetails>({
    resolver: zodResolver(registerBusinessDetailsSchema),
    defaultValues: {
      businessName: "",
      businessAddress: "",
      businessEmail: "",

    },
  });

  const tempID  = useTempStore((state) => state.tempID)




  const registerBusinessMutation = useRegisterBusiness()

  const onSubmit = (data: RegisterBusinessDetails) => {
    console.debug("RegisterBusinessRequest:", data)
    if (!tempID) {
      Toast.show({
        type: "error",
        text1: "Unknown user",
        text2: "Please try registering again",
        position: "bottom",
        autoHide: true,
        visibilityTime: 3000,
      })
      return
    }

    const payload: RegisterBusinessRequest = {
      name: data.businessName,
      address: data.businessAddress,
      email: data.businessEmail,
      user_id: tempID,
    }

    registerBusinessMutation.mutate(payload, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "Business registered successfully",
          position: "bottom",
        })
        router.push("/(auth)/login")
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Failed to register business",
          text2: "Please try again",
        })
        console.error("Failed to register business:", error)
      }
    })
  }





  return (
    <SafeAreaView className="flex-1 bg-[#f6f8fb]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow px-6 pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        <View className="items-center">
          <Text className="text-center text-[36px] font-bold leading-[42px] tracking-[-0.5px] text-[#171a21]">
            Set up your business
          </Text>
          <Text className="mt-4 max-w-[330px] text-center text-[17px] leading-[28px] text-[#7a8596]">
            Provide your company details to start managing your inventory with precision.
          </Text>
        </View>

        <View className="mt-10 rounded-[24px] border border-[#e6ebf1] bg-white px-6 py-6 shadow-sm">
          <View>
            <Text className="mb-3 text-[15px] font-medium text-[#535862]">
              Business Name
            </Text>
            <Controller
              control={control}
              name="businessName"
              render={({ field }) => (
                <View>
                  <View className="rounded-2xl bg-[#f4f8f3] px-4">
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="e.g. Global Logistics Inc."
                      placeholderTextColor="#a4afbf"
                      autoCorrect={false}
                      autoComplete="off"
                      autoCapitalize="words"
                      returnKeyType="next"
                      className="py-4 text-[18px] text-[#171a21]"
                    />
                  </View>
                  {errors.businessName && (
                    <Text className="mt-2 text-[13px] text-red-500">
                      {errors.businessName?.message ?? "Business Name is required"}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="mt-6">
            <Text className="mb-3 text-[15px] font-medium text-[#535862]">
              Business Email
            </Text>
            <Controller
              control={control}
              name="businessEmail"
              render={({ field }) => (
                <View>
                  <View className="rounded-2xl bg-[#f4f8f3] px-4">
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="company@example.com"
                      placeholderTextColor="#a4afbf"
                      autoCorrect={false}
                      autoComplete="off"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      className="py-4 text-[18px] text-[#171a21]"
                    />
                  </View>
                  {errors.businessEmail && (
                    <Text className="mt-2 text-[13px] text-red-500">
                      {errors.businessEmail?.message ?? "Business Email is required"}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="mt-6">
            <Text className="mb-3 text-[15px] font-medium text-[#535862]">
              Business Address
            </Text>
            <Controller
              control={control}
              name="businessAddress"
              render={({ field }) => (
                <View>
                  <View className="rounded-2xl bg-[#f4f8f3] px-4">
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="City or Facility Name"
                      placeholderTextColor="#a4afbf"
                      autoCorrect={false}
                      autoComplete="off"
                      autoCapitalize="words"
                      keyboardType="default"
                      returnKeyType="next"
                      className="py-4 text-[18px] text-[#171a21]"
                    />
                  </View>
                  {errors.businessAddress && (
                    <Text className="mt-2 text-[13px] text-red-500">
                      {errors.businessAddress?.message ?? "Business Address is required"}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="mt-8 items-center rounded-2xl bg-[#0b7a4d] px-5 py-4 shadow-sm"
          >
            <Text className="text-[18px] font-semibold text-white">
              {registerBusinessMutation.isPending ? "Creating..." : "Create Business ->"}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push("/(auth)/login")}
          className="mt-16 items-center justify-center"
        >
          <Text className="text-[15px] text-[#7a8596]">Logout & Switch Account</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
