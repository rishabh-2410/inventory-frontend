import { router } from 'expo-router'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from '@/hooks/mutation/add/userRegister';
import { RegisterUserRequest, RegisterUserResponse, registerUserRequestSchema } from '@/models/zodSchema/register.schema';
import Toast from 'react-native-toast-message';
import { useTempStore } from '@/store/temp.store';



export default function LoginScreen() {


  const {control, handleSubmit, reset, formState: { errors }} = useForm<RegisterUserRequest>({
    resolver: zodResolver(registerUserRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const setTempID  = useTempStore((state) => state.setTempID)




  const registerMutation = useRegister()

  const onSubmit = (data: RegisterUserRequest) => {
    console.debug("RegisterRequest:", data)
    registerMutation.mutate(data, {
      onSuccess: async (response: RegisterUserResponse) => {
        setTempID(response.id)
        Toast.show({
          type: "success",
          text1: "Register successful",
          text2: "Proceed to setup your business",
          position: "bottom",
          autoHide: true,
          visibilityTime: 3000,
        })
        router.push("/(auth)/setup-business")
      },
      onError: (error) => {
        console.debug("Register failed:", error)
        Toast.show({
          type: "error",
          text1: "Register failed",
          text2: "Please try again",
          position: "bottom",
          autoHide: true,
          visibilityTime: 3000,
        })
        router.push("/(auth)/register")
      }
    })

  }



  return (
    <SafeAreaView className="flex-1 bg-[#f6f8fb]">
      <ScrollView
        className="flex-1 p-4"
        contentContainerClassName="flex-grow px-6 pb-10 pt-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center">
          <View className="mb-8 h-24 w-24 items-center justify-center rounded-[20px] bg-[#dff1ea]">
            <View className="items-center">
              <Text className="text-[34px] font-semibold leading-[36px] text-[#0f8f5b]">
                +
              </Text>
              <Text className="mt-[-8px] text-[12px] font-medium text-[#0f8f5b]">
                USER
              </Text>
            </View>
          </View>

          <Text className="text-center text-[36px] font-bold leading-[42px] tracking-[-0.5px] text-[#171a21]">
            Create your account
          </Text>
          <Text className="mt-4 max-w-[320px] text-center text-[17px] leading-[28px] text-[#7a8596]">
            Start managing your assets with professional precision today.
          </Text>
        </View>

        <View className="mt-10 rounded-[28px] border border-[#e6ebf1] bg-white px-6 py-7 shadow-sm">
          <View>
            <Text className="mb-3 text-[15px] font-medium text-[#7a8596]">
              Full Name
            </Text>
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <View>
                  <View className="flex-row items-center rounded-2xl border border-[#98a2b3] bg-white px-4">
                    <Text className="mr-3 text-[18px] text-[#667085]">[]</Text>
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="John Doe"
                      placeholderTextColor="#b3bcc8"
                      autoCorrect={false}
                      autoComplete="off"
                      autoCapitalize="words"
                      returnKeyType="next"
                      className="flex-1 py-4 text-[18px] text-[#171a21]"
                    />
                  </View>
                  {errors.name && (
                    <Text className="mt-2 text-[13px] text-red-500">
                      {errors.name?.message ?? "Name is required"}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="mt-6">
            <Text className="mb-3 text-[15px] font-medium text-[#7a8596]">
              Work Email
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <View>
                  <View className="flex-row items-center rounded-2xl border border-[#98a2b3] bg-white px-4">
                    <Text className="mr-3 text-[18px] text-[#667085]">@</Text>
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="name@company.com"
                      placeholderTextColor="#b3bcc8"
                      autoCorrect={false}
                      autoComplete="off"
                      autoCapitalize="none"
                      keyboardType="email-address"
                      returnKeyType="next"
                      className="flex-1 py-4 text-[18px] text-[#171a21]"
                    />
                  </View>
                  {errors.email && (
                    <Text className="mt-2 text-[13px] text-red-500">
                      {errors.email?.message ?? "Email is required"}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="mt-6">
            <Text className="mb-3 text-[15px] font-medium text-[#7a8596]">
              Password
            </Text>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <View>
                  <View className="flex-row items-center rounded-2xl border border-[#98a2b3] bg-white px-4">
                    <Text className="mr-3 text-[18px] text-[#667085]">*</Text>
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="........"
                      placeholderTextColor="#b3bcc8"
                      autoCorrect={false}
                      autoComplete="off"
                      keyboardType="default"
                      returnKeyType="done"
                      secureTextEntry
                      className="flex-1 py-4 text-[18px] text-[#171a21]"
                    />
                    <Text className="ml-3 text-[12px] font-medium text-[#667085]">
                      SHOW
                    </Text>
                  </View>
                  {errors.password && (
                    <Text className="mt-2 text-[13px] text-red-500">
                      {errors.password?.message ?? "Password is required"}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="mt-8 items-center rounded-2xl bg-[#0f8f5b] px-5 py-4"
          >
            <Text className="text-[18px] font-semibold text-white">
              {registerMutation.isPending ? "Registering..." : "Register ->"}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={() => router.push("/(auth)/login")}
          className="mt-7 items-center justify-center"
        >
          <Text className="text-[15px] text-[#7a8596]">
            Already have an account ?{" "}
            <Text className="font-semibold text-[#0f8f5b]">Log in</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}
