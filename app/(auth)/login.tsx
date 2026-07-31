import { router } from 'expo-router'
import { Button, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginRequestSchema } from '@/models/schemas/auth.schema'
import { LoginRequest, LoginResponse } from '@/models/types/auth.type'
import { useLogin } from '@/hooks/mutation/useLogin'
import { queryClient } from '@/lib/queryclient'
import { useState } from 'react';



export default function LoginScreen() {

  const {control, handleSubmit, reset, formState: { errors }} = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginRes, setLoginRes] = useState<LoginResponse>()


  const loginMutation = useLogin()


  const onSubmit = (data: LoginRequest) => {
    console.debug("LoginRequest:", data)
    loginMutation.mutate(data, {
      onSuccess: async(data: LoginResponse) => {
        console.debug("LoginResponse:", data)
        setLoginRes(data)
      }
    })
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

