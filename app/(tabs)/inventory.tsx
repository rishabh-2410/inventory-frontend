import { useGetInventory } from '@/hooks/query/useGetInventory'
import { useState } from 'react'
import { View, Text, ActivityIndicator, TextInput, FlatList, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDebounce } from 'use-debounce'
export default function InventoryScreen() {

  const [ search, setSearch ] = useState('')
  const [ warehouseId, setWarehouseId ] = useState('')
  const [ categoryId, setCategoryId ] = useState('')
  const [ productId, setProductId ] = useState('')

  const [ debouncedSearch ] = useDebounce(search, 500)
 
  const { data: inventory, isLoading, error, isFetching } = useGetInventory({
    limit: 10,
    page: 1,
    search: debouncedSearch,
    warehouse_id: '',
    category_id: '',
    product_id: '',
  })


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }




  return (
    <SafeAreaView className="flex-1 bg-[#f6f8fb]">
      <View className="flex-1 bg-[#f6f8fb]">
        <FlatList
          className="flex-1"
          contentContainerClassName="px-6 pb-24"
          data={inventory ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mb-5 rounded-[22px] border border-[#e6ebf1] bg-white px-4 py-4">
              <View className="flex-row">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-xl bg-[#eef2f6]">
                  <Text className="text-[16px] font-semibold text-[#0b7a4d]">
                    {item.product_name.charAt(0)}
                  </Text>
                </View>

                <View className="flex-1">
                  <View className="flex-row items-start justify-between">
                    <View className="flex-1 pr-3">
                      <Text className="text-[16px] font-bold text-[#171a21]">
                        {item.product_name}
                      </Text>
                      <Text className="mt-2 text-[14px] text-[#7a8596]">
                        SKU: {item.sku}
                      </Text>
                    </View>

                    <View className="rounded-full bg-[#e8f3ed] px-3 py-2">
                      <Text className="text-[12px] font-medium text-[#0b7a4d]">
                        {item.category_name}
                      </Text>
                    </View>
                  </View>

                  <View className="mt-5 flex-row items-end justify-between">
                    <View>
                      <Text className="text-[14px] text-[#7a8596]">Total Stock</Text>
                      <Text className="mt-1 text-[14px] font-semibold text-[#0b7a4d]">
                        {item.current_stock} <Text className="font-normal text-[#7a8596]">units</Text>
                      </Text>
                    </View>

                    <Text className="text-[15px] font-semibold text-[#0a63d8]">
                      {item.current_stock <= 20 ? "Restock" : "Details"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          ListHeaderComponent={
            <View>
              <View className="mb-8 rounded-[24px] bg-[#0b7a4d] px-4 py-12">
                <Text className="text-[18px] font-bold text-white">Inventory Operations</Text>
                <Text className="mt-2 max-w-[260px] text-[14px] leading-6 text-[#d5efe4]">
                  Live stock tracking and operational movement history.
                </Text>
              </View>

              <View className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-3">
                <TextInput 
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search by SKU or Name..."
                  placeholderTextColor="#7a8596"
                  className="text-[16px] text-[#171a21]"
                />
              </View>

              {isFetching && (
                <View className="mb-4">
                  <ActivityIndicator size="small" color="#0b7a4d" />
                </View>
              )}
            </View>
          }
          ListEmptyComponent={
            !isFetching ? (
              <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-8">
                <Text className="text-center text-[15px] text-[#7a8596]">
                  No inventory found
                </Text>
              </View>
            ) : null
          }
        />

        <Pressable className="absolute bottom-6 right-6 h-14 w-14 items-center justify-center rounded-full bg-[#0b7a4d] shadow-sm">
          <Text className="text-[28px] font-light text-white">+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}
