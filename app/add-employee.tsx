import { Controller, useForm } from 'react-hook-form'
import { Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { router } from 'expo-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterUserRequest, registerUserRequestSchema } from '@/models/zodSchema/register.schema'
import { useAddUser } from '@/hooks/mutation/add/useUser'
import Toast from 'react-native-toast-message'
import { getApiErrorMessage } from '@/lib/api-error'
import { queryClient } from '@/lib/queryclient'
import { queryKeys } from '@/lib/queryKeys'
import { UsersResponse } from '@/models/zodSchema/user.schema'


export default function AddEmployeeScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserRequest>({
    resolver: zodResolver(registerUserRequestSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const addEmployeeMutation = useAddUser()

  const onSubmit = (data: RegisterUserRequest) => {
    console.log('add employee', data)

    addEmployeeMutation.mutate(data, {
      onSuccess: (newUser, _, context) => {
        queryClient.setQueryData(queryKeys.users, (oldData: UsersResponse[]) => {
          oldData?.map((user) => user.id === context?.optimisticUser?.id ? newUser : user)
        })
        Toast.show({
          type: 'success',
          text1: 'Employee added successfully',
          position: 'bottom',
          visibilityTime: 3000,
          autoHide: true,
        })
        router.back()
      },
      onError: (error) => {
        console.error(error)
        Toast.show({
          type: 'error',
          text1: 'Error adding employee',
          text2: getApiErrorMessage(error, 'Please try again'),
          position: 'bottom',
          visibilityTime: 3000,
          autoHide: true,
        })
      },
    })
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <View className="flex-row items-center justify-between bg-white px-4 pb-3 pt-1">
        <Pressable
          onPress={() => router.back()}
          className="h-10 w-10 items-center justify-center"
          hitSlop={8}
        >
          <MaterialIcons name="arrow-back" size={24} color="#171a21" />
        </Pressable>
        <Text className="text-[18px] font-bold text-[#171a21]">Employee Details</Text>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-[#0b7a4d]">
          <MaterialIcons name="person" size={22} color="white" />
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-white"
        contentContainerClassName="px-6 pb-10 pt-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-[28px] font-bold text-[#171a21]">Employee Details</Text>
        <Text className="mt-2 text-[15px] text-[#7a8596]">
          Enter the new team members&apos; information.
        </Text>

        <Text className="mb-2 mt-8 text-[14px] font-medium text-[#7a8596]">Full Name</Text>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <View className="mb-1 flex-row items-center rounded-2xl bg-[#eef4ef] px-4">
              <MaterialIcons name="badge" size={20} color="#7a8596" />
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder="Jane Doe"
                placeholderTextColor="#98a2b3"
                autoCapitalize="words"
                autoCorrect={false}
                className="ml-3 flex-1 py-4 text-[16px] text-[#171a21]"
              />
            </View>
          )}
        />
        {errors.name && <Text className="mb-3 text-[13px] text-red-500">{errors.name.message}</Text>}

        <Text className="mb-2 mt-4 text-[14px] font-medium text-[#7a8596]">Email Address</Text>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <View className="mb-1 flex-row items-center rounded-2xl bg-[#eef4ef] px-4">
              <MaterialIcons name="email" size={20} color="#7a8596" />
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder="jane.doe@company.com"
                placeholderTextColor="#98a2b3"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                className="ml-3 flex-1 py-4 text-[16px] text-[#171a21]"
              />
            </View>
          )}
        />
        {errors.email && <Text className="mb-3 text-[13px] text-red-500">{errors.email.message}</Text>}

        <Text className="mb-2 mt-4 text-[14px] font-medium text-[#7a8596]">Password</Text>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <View className="mb-1 flex-row items-center rounded-2xl bg-[#eef4ef] px-4">
              <MaterialIcons name="lock" size={20} color="#7a8596" />
              <TextInput
                value={field.value}
                onChangeText={field.onChange}
                placeholder="******"
                placeholderTextColor="#98a2b3"
                keyboardType="phone-pad"
                className="ml-3 flex-1 py-4 text-[16px] text-[#171a21]"
                secureTextEntry={true}
              />
            </View>
          )}
        />
        {errors.password && <Text className="mb-3 text-[13px] text-red-500">{errors.password.message}</Text>}

        <Text className="mb-2 mt-6 text-[14px] font-medium text-[#7a8596]">System Role</Text>
            <View className="mb-5 flex-row items-center rounded-2xl border border-[#e6ebf1] bg-[#f8faf9] px-4 py-4">
              <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-[#dbeafe]">
                <MaterialIcons name="groups" size={22} color="#2563eb" />
              </View>
              <View className="flex-1">
                <Text className="text-[16px] font-bold text-[#171a21]">Employee</Text>
                <Text className="mt-0.5 text-[13px] text-[#7a8596]">Standard access</Text>
              </View>
              <MaterialIcons name="check-circle" size={26} color="#0b7a4d" />
              </View>

        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="mr-3 flex-1 items-center rounded-2xl bg-[#e8eaed] py-4"
          >
            <Text className="text-[16px] font-semibold text-[#374151]">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="flex-[1.6] flex-row items-center justify-center rounded-2xl bg-[#0b7a4d] py-4"
          >
            <Text className="mr-2 text-[16px] font-semibold text-white">Create Employee</Text>
            <MaterialIcons name="arrow-forward" size={18} color="white" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
