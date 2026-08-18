import { router, Link } from 'expo-router'
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequestSchema } from '@/models/zodSchema/login.schema'
import { LoginRequest, LoginResponse, User } from '@/models/types/auth.type'
import { useLogin } from '@/hooks/mutation/add/useLogin'
import { useAuthStore } from '@/store/auth.store';
import { useState } from 'react';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { queryClient } from '@/lib/queryclient';
import Toast from 'react-native-toast-message';
import { getApiErrorMessage } from '@/lib/api-error';




export default function LoginScreen() {

  const {control, handleSubmit, formState: { errors }} = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const setSession = useAuthStore((state) => state.setSession)
  const [showPassword, setShowPassword] = useState(false)


  const loginMutation = useLogin()


  const onSubmit = (data: LoginRequest) => {
    console.debug("LoginRequest:", data)
    loginMutation.mutate(data, {
      onSuccess: async(data: LoginResponse) => {
        queryClient.clear()
        await handleSession(data)
        console.debug("LoginResponse:", data)
        router.navigate("/")
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: getApiErrorMessage(error, "Invalid credentials"),
          position: "bottom",
          autoHide: true,
          visibilityTime: 3000,
        })
      }
    })
  }


  const handleSession = async(data: LoginResponse) => {
    let user: User ={
      id: data.id,
      name: data.name,
      email: data.email,
      business_id: data.business_id,
      role: data.role,
      is_active: data.is_active,
      created_at: data.created_at,
    }
    
    setSession(user, data.access_token, data.refresh_token, data.access_token_expires_at)
  }

  return (
    <SafeAreaView className="flex-1 bg-[#f6f8fb]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow px-6 pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-8 items-center pt-10">
          <View className="h-24 w-24 items-center justify-center rounded-[20px] bg-[#dff1ea]">
            <View className="items-center">
              <MaterialIcons name="inventory" size={36} color="#0f8f5b" />
            </View>
          </View>

          <Text className="mt-4 text-center text-[36px] font-inter-bold leading-[42px] tracking-[-0.5px] text-[#171a21]">
            Invento Pro
          </Text>
          <Text className="mt-3 text-center text-[17px] font-inter-medium leading-[28px] text-[#7a8596]">
            Efficient warehouse management ecosystem
          </Text>
        </View>

        <View className="rounded-[24px] border border-[#e6ebf1] bg-white px-6 py-7 shadow-sm">
          <Text className="text-[20px] font-inter-bold text-[#171a21]">Sign In</Text>

          <View className="mt-8">
            <Text className="mb-3 text-[15px] font-inter-medium text-[#535862]">
              Email Address
            </Text>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <View>
                  <View className="flex-row items-center rounded-2xl border border-[#98a2b3] bg-white px-4">
                    <Text className="mr-3 text-[18px] font-inter-regular text-[#667085]">@</Text>
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
                      className="flex-1 py-4 text-[18px] font-inter-regular text-[#171a21]"
                    />
                  </View>
                  {errors.email && (
                    <Text className="mt-2 text-[13px] font-inter-regular text-red-500">
                      {errors.email.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="mt-6">
            <View className="mb-3 flex-row items-center justify-between">
              <Text className="text-[15px] font-inter-medium text-[#535862]">Password</Text>
            </View>
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <View>
                  <View className="flex-row items-center justify-center rounded-2xl border border-[#98a2b3] bg-white px-4">
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      placeholder="********"
                      placeholderTextColor="#b3bcc8"
                      autoCorrect={false}
                      autoComplete="off"
                      keyboardType="default"
                      returnKeyType="done"
                      secureTextEntry={!showPassword}
                      className="flex-1 py-4 text-[18px] font-inter-regular text-[#171a21]"
                    />
                    <Pressable 
                      onPress={() => {
                       setShowPassword((showPassword) => !showPassword)
                      }} 
                      className="ml-3 text-[12px] font-inter-medium text-[#667085]"
                    >
                      <Text>
                        {showPassword ? <MaterialIcons name="visibility" size={24} color="#667085" /> : <MaterialIcons name="visibility-off" size={24} color="#667085" />}
                      </Text>
                    </Pressable>
                  </View>
                  {errors.password && (
                    <Text className="mt-2 text-[13px] font-inter-regular text-red-500">
                      {errors.password.message}
                    </Text>
                  )}
                </View>
              )}
            />
          </View>

          <View className="mt-6 flex-row items-center">
    
          </View>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="mt-8 items-center rounded-2xl bg-[#0b7a4d] px-5 py-4 shadow-sm"
          >
            <Text className="text-[18px] font-inter-semibold text-white">
              {loginMutation.isPending ? "Logging in..." : "Login ->"}
            </Text>
          </Pressable>
        </View>

        <View className="mt-10 items-center">
          <Pressable onPress={() => router.push("/(auth)/register")}>
            <Text className="text-[15px] font-inter-regular text-[#7a8596]">
              Don&apos;t have an account?{" "}
              <Text className="font-inter-medium text-[#0b7a4d]">Request Access</Text>
            </Text>
          </Pressable>

          <Text className="mt-4 text-[12px] font-inter-medium uppercase tracking-[2px] text-[#b3bcc8]">
            <Link href="privacy-policy">Privacy Policy</Link>  •  <Link href="terms-of-service">Terms of Service</Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}
