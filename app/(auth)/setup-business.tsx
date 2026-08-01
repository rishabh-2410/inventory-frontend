import { router } from 'expo-router'
import { Button, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from '@/hooks/mutation/userRegister';
import { RegisterBusinessDetails, registerBusinessDetailsSchema } from '@/models/zodSchema/register.schema';
import Toast from 'react-native-toast-message';
import { useRegisterBusiness } from '@/hooks/mutation/useBusiness';
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
    <SafeAreaView>
      <View>
        <Text>Setup Business</Text>

        <Controller
          control={control}
          name="businessName"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Business Name"
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              returnKeyType="next"
            />
          )}
        />
        {errors.businessName && (
          <Text className='text-red-500'>
            {errors.businessName?.message ?? "Business Name is required"}
          </Text>
        )}


        <Controller
          control={control}
          name="businessAddress"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Business Address"
              autoCorrect={false}
              autoComplete="off"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
            />
          )}
        />
        {errors.businessAddress && (
          <Text className='text-red-500'>
            {errors.businessAddress?.message ?? "Business Address is required"}
          </Text>
        )}
        <Controller
          control={control}
          name="businessEmail"
          render={({ field }) => (
            <TextInput
              value={field.value}
              onChangeText={field.onChange}
              placeholder="Business Email"
              autoCorrect={false}
              autoComplete="off"
              keyboardType="default"
              returnKeyType="done"
            />
          )}
        />
        {errors.businessEmail && (
          <Text className='text-red-500'>
            {errors.businessEmail?.message ?? "Business Email is required"}
          </Text>
        )}


        <Button title="Setup Business" onPress={handleSubmit(onSubmit)} />

      </View>
    </SafeAreaView>
  )
}

