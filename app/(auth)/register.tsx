import { router } from 'expo-router'
import { Button, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from '@/hooks/mutation/userRegister';
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
    <SafeAreaView>
      <View>
        <Text>Register</Text>

        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Name"
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
        />
        {errors.name && (
          <Text className='text-red-500'>
            {errors.name?.message ?? "Name is required"}
          </Text>
        )}


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
            {errors.email?.message ?? "Email is required"}
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
            {errors.password?.message ?? "Password is required"}
          </Text>
        )}


        <Button title="Register" onPress={handleSubmit(onSubmit)} />

      </View>
    </SafeAreaView>
  )
}

