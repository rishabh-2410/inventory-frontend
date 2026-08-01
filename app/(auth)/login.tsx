import { router } from 'expo-router'
import { Button, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequestSchema } from '@/models/zodSchema/login.schema'
import { LoginRequest, LoginResponse, User } from '@/models/types/auth.type'
import { useLogin } from '@/hooks/mutation/useLogin'
import { queryClient } from '@/lib/queryclient'
import { useState } from 'react';
import { saveRefreshToken } from '@/store/token.store';
import { useAuthStore } from '@/store/auth.store';



export default function LoginScreen() {

  const {control, handleSubmit, reset, formState: { errors }} = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const setSession = useAuthStore((state) => state.setSession)

  const [loginRes, setLoginRes] = useState<LoginResponse>()


  const loginMutation = useLogin()


  const onSubmit = (data: LoginRequest) => {
    console.debug("LoginRequest:", data)
    loginMutation.mutate(data, {
      onSuccess: async(data: LoginResponse) => {
        await handleSession(data)
        console.debug("LoginResponse:", data)
        router.navigate("/")
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

    await saveRefreshToken(data.refresh_token)
    setSession(user, data.access_token)
  }

  return (
    <SafeAreaView>
      <View>
        <Text>Login</Text>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Email"
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          )}
        />
        {errors.email && (
          <Text className='text-red-500'>
            {errors.email.message}
          </Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Password"
              autoCorrect={false}
              autoComplete="off"
              keyboardType="default"
              returnKeyType="done"
            />
          )}
        />
        {errors.password && (
          <Text className='text-red-500'>
            {errors.password.message}
          </Text>
        )}


        <Button title="Login" onPress={handleSubmit(onSubmit)} />
        {!loginMutation.isPending && <Text className='text-green-500'>{loginRes?.name}</Text>}
      </View>
    </SafeAreaView>
  )
}

