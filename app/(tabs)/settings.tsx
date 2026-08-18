import { router } from 'expo-router'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuthStore } from '@/store/auth.store'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { queryClient } from '@/lib/queryclient'

export default function SettingsScreen() {
  const user = useAuthStore((state) => state.user)
  const clearSession = useAuthStore((state) => state.clearSession)
  const isOwner = user?.role === "owner"

  const managementItems = [
    { label: "Products", onPress: () => router.push('/products') },
    { label: "Categories", onPress: () => router.push('/categories') },
    { label: "Warehouses", onPress: () => router.push('/warehouses') },
    { label: "Employees", onPress: () => router.push('/employee') },
  ]

  const accountItems = isOwner
    ? [
        { label: "Privacy Policy", subtitle: "", external: true },
        { label: "Help Center", subtitle: "", external: false },
      ]
    : [
        { label: "Privacy Policy", subtitle: "Data protection & usage terms", external: false },
        { label: "Help Center", subtitle: "Guides and support contact", external: false },
        { label: "About Us", subtitle: "Get to know use better", external: false },
      ]

  return (
    <SafeAreaView className="flex-1 bg-[#f6f8fb]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-20"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-[-24px] mb-6 border-b border-[#e5e7eb] bg-white px-6 py-5">
          <View className="flex-row items-center justify-between px-8">
            <Text className="text-[18px] font-inter-bold text-[#171a21]">Settings</Text>
            <View className="h-10 w-10 items-center justify-center rounded-full bg-[#0b7a4d]">
              <MaterialIcons name="settings" size={24} color="white" />
            </View>
          </View>
        </View>

        <View className="px-6">
          {isOwner ? (
            <View className="mb-7 rounded-[24px] bg-[#0b7a4d] px-6 py-6 shadow-sm">
              <View className="flex-row items-center">
                <View className="mr-4 h-20 w-20 items-center justify-center rounded-full bg-[#d9e6df]">
                  <Text className="text-[24px] font-inter-bold text-[#0b7a4d]">
                    {user?.name?.charAt(0) ?? "A"}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-[18px] font-inter-bold text-white">
                    {user?.name ?? "Admin User"}
                  </Text>
                  <Text className="mt-1 text-[14px] font-inter-regular text-[#d5efe4]">
                    {user?.email ?? "admin@inventory-flow.com"}
                  </Text>
                  <View className="mt-3 self-start rounded-full bg-[#4ea77a] px-3 py-2">
                    <Text className="text-[13px] font-inter-medium text-white">Super Admin</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View className="mb-7 rounded-[24px] border border-[#e6ebf1] bg-white px-6 py-8 shadow-sm">
              <View className="items-center">
                <View className="h-24 w-24 items-center justify-center rounded-full border-4 border-[#3b82f6] bg-[#d9e6df]">
                  <Text className="text-[28px] font-inter-bold text-[#0b7a4d]">
                    {user?.name?.charAt(0) ?? "E"}
                  </Text>
                </View>
                <Text className="mt-6 text-[18px] font-inter-bold text-[#171a21]">
                  {user?.name ?? "Employee User"}
                </Text>
                <Text className="mt-2 text-[15px] font-inter-regular text-[#7a8596]">
                  {user?.email ?? "employee.user@logistics-flow.com"}
                </Text>
                <View className="mt-4 rounded-full bg-[#e8f3ed] px-4 py-2">
                  <Text className="text-[13px] font-inter-medium text-[#0b7a4d]">Standard Access</Text>
                </View>
              </View>
            </View>
          )}

          {isOwner && (
            <View className="mb-7">
              <Text className="mb-4 text-[15px] font-inter-bold text-[#171a21]">
                Organization Management
              </Text>
              <View className="rounded-[22px] border border-[#e6ebf1] bg-white">
                {managementItems.map((item, index) => (
                  <Pressable
                    key={item.label}
                    onPress={item.onPress}
                    className={`flex-row items-center justify-between px-4 py-5 ${index < managementItems.length - 1 ? "border-b border-[#eef2f6]" : ""}`}
                  >
                    <View className="flex-row items-center">
                      <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-[#e8f3ed]">
                        <Text className="text-[14px] font-inter-semibold text-[#0b7a4d]">
                          {item.label.charAt(0)}
                        </Text>
                      </View>
                      <Text className="text-[16px] font-inter-semibold text-[#171a21]">{item.label}</Text>
                    </View>
                    <Text className="text-[20px] font-inter-regular text-[#7a8596]">›</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}

          <View className="mb-10">
            <Text className="mb-4 text-[15px] font-inter-medium uppercase tracking-[1.2px] text-[#7a8596]">
              Account
            </Text>
            <View className="rounded-[22px] border border-[#e6ebf1] bg-white">
              {accountItems.map((item, index) => (
                <Pressable
                  key={item.label}
                  className={`flex-row items-center justify-between px-4 py-5 ${index < accountItems.length - 1 ? "border-b border-[#eef2f6]" : ""}`}
                >
                  <View className="flex-row items-center">
                    <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-[#eef4ef]">
                      <Text className="text-[14px] font-inter-semibold text-[#0b7a4d]">
                        {item.label.charAt(0)}
                      </Text>
                    </View>
                    <View>
                      <Text className="text-[16px] font-inter-semibold text-[#171a21]">{item.label}</Text>
                      {!!item.subtitle && (
                        <Text className="mt-1 text-[14px] font-inter-regular text-[#7a8596]">{item.subtitle}</Text>
                      )}
                    </View>
                  </View>
                  <Text className="text-[20px] font-inter-regular text-[#7a8596]">{item.external ? "↗" : "›"}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          <Pressable
            onPress={() => {
              clearSession()
              queryClient.clear()
              router.replace('/(auth)/login')
            }}
            className="rounded-[20px] bg-[#ffe3e6] px-5 py-5"
          >
            <Text className="text-center text-[18px] font-inter-semibold text-[#ff4d57]">
              Log Out of Session
            </Text>
          </Pressable>

          <Text className="mt-5 text-center text-[14px] font-inter-regular text-[#98a2b3]">
            Version 2.4.1 (Build 8902)
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
