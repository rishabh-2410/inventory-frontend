import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { router } from 'expo-router'

import { User } from '@/models/types/auth.type'
import { useGetUsers } from '@/hooks/query/getUser'
import { useAddUser, useDeleteUser } from '@/hooks/mutation/add/useUser'
import ReanimatedSwipeable, { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";
import React, { useRef } from 'react'


function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export default function EmployeeScreen() {
  const { data: employees, isLoading, isError } = useGetUsers()
  const deleteEmployeeMutation = useDeleteUser()

  const openedSwipeableRef = useRef<SwipeableMethods | null>(null);



  const handleAddEmployee = () => {
    router.push('/add-employee')
  }

  const handleDeleteEmployee = (name: string, employeeID: string) => {
    Alert.alert(
      'Delete employee',
      `Delete "${name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteEmployeeMutation.mutate(employeeID) },
      ]
    )
  }


  const renderRightActions = (item: User) => (
    <View className="flex-row items-center justify-end p-4">
      <Pressable onPress={() => handleDeleteEmployee(item.name, item.id)} hitSlop={8} className="h-8 w-8 items-center justify-center">
        <MaterialIcons name="delete" size={22} color="#ff4d57" />
      </Pressable>
    </View>
  )

  const renderEmployees = ({ item }: { item: User }) => {
    const isActive = item.is_active
    const rowRef = React.createRef<SwipeableMethods>();
    return (
      <ReanimatedSwipeable
        enabled={isActive}
        overshootRight={false}
        renderRightActions={isActive ? () => renderRightActions(item) : undefined}
        ref={rowRef}
        onSwipeableOpen={() => {
          if (isActive) {
            openedSwipeableRef.current = rowRef.current;
          } else {
            rowRef.current?.close();
          }
        }}
      >
        <View className="mb-3 flex-row items-center rounded-[16px] bg-white px-4 py-3.5 shadow-sm">
          <View className="mr-3 h-12 w-12 items-center justify-center rounded-full bg-[#e5e7eb]">
            <Text className="text-[13px] font-inter-semibold tracking-wide text-[#6b7280]">
              {getInitials(item.name)}
            </Text>
          </View>

          <View className={`flex-1 ${isActive ? '' : 'opacity-50'}`}>
            <Text className="text-[16px] font-inter-bold text-[#111827]">{item.name}</Text>
            <Text className="mt-0.5 text-[13px] font-inter-regular text-[#9ca3af]">Employee</Text>
          </View>

          <View className={`mr-4 rounded-full px-3 py-1 ${isActive ? 'bg-[#dcfce7]' : 'bg-[#f3f4f6]'}`}>
            <Text className={`text-[12px] font-inter-semibold ${isActive ? 'text-[#166534]' : 'text-[#4b5563]'}`}>
              {isActive ? 'Active' : 'Inactive'}
            </Text>
          </View>
          {/* 
                  {
                    isActive && (
                      <Pressable
                        onPress={() => handleDeleteEmployee(item.name, item.id)}
                        hitSlop={8}
                        className="h-8 w-8 items-center justify-center"
                      >
                        <MaterialIcons name="delete" size={22} color="#9ca3af" />
                      </Pressable>
                    )
                  } */}
        </View>


      </ReanimatedSwipeable>
    )
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
        <Text className="text-[18px] font-inter-bold text-[#171a21]">Employees</Text>
        <View className="h-10 w-10 items-center justify-center rounded-full bg-[#0b7a4d]">
          <MaterialIcons name="person" size={22} color="white" />
        </View>
      </View>

      <View className="flex-1 bg-[#f3f4f6]">
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#0b7a4d" />
          </View>
        ) : isError ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center text-[15px] font-inter-regular text-[#7a8596]">Error loading employees</Text>
          </View>
        ) : (
          <FlatList
            className="flex-1"
            contentContainerClassName="px-4 pt-3 pb-28"
            data={employees ?? []}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={renderEmployees}
            ListEmptyComponent={
              <View className="rounded-[16px] bg-white px-5 py-8">
                <Text className="text-center text-[15px] font-inter-regular text-[#7a8596]">No employees found</Text>
              </View>
            }
          />
        )}

        <Pressable
          onPress={handleAddEmployee}
          className="absolute bottom-10 right-6 h-14 w-14 items-center justify-center rounded-[18px] bg-[#0b7a4d] shadow-lg"
        >
          <MaterialIcons name="add" size={28} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
