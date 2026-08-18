import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@react-native-vector-icons/material-icons'

import AddProductSheet from '../components/bottomsheets/products/AddProductSheet'
import EditProductSheet from '../components/bottomsheets/products/EditProductSheet'
import { useGetProducts } from '@/hooks/query/useGetProducts'
import { Product } from '@/models/zodSchema/product.schema'
import { Warehouse } from '@/models/zodSchema/warehouse.schema'
import { useGetWarehouses } from '@/hooks/query/useGetWarehouse'
import AddWarehouseSheet from '@/components/bottomsheets/warehouses/AddWarehouseSheet'
import EditWarehouseSheet from '@/components/bottomsheets/warehouses/EditWarehouseSheet'
import { useDeleteWarehouse } from '@/hooks/mutation/delete/useDeleteWarehouse'

export default function WarehouseScreen() {
  const addWarehouseBottomSheetRef = useRef<BottomSheetModal>(null)
  const editWarehouseBottomSheetRef = useRef<BottomSheetModal>(null)
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null)

  const deleteWarehouseMutation = useDeleteWarehouse()

  const handleAddWarehouse = () => {
    addWarehouseBottomSheetRef.current?.present()
  }

  const handleEditWarehouse = (item: Warehouse) => {  
    setSelectedWarehouse(item)
    editWarehouseBottomSheetRef.current?.present()
  }

  const { data: warehouses, isLoading, isError } = useGetWarehouses()


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0b7a4d" />
  }

  if (isError) {
    return <View>
      <Text className="font-inter-regular text-[15px] text-[#7a8596]">Error loading warehouses</Text>
    </View>;
  }

  const handleDeleteWarehouse = ( name: string, warehouseID: string ) => {
    Alert.alert(
      'Delete warehouse',
      `Delete "${name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => deleteWarehouseMutation.mutate(warehouseID) }
      ]
    )
  }
  return (
    <>
      <SafeAreaView className="flex-1 bg-[#f6f8fb]">
        <View className="flex-1 bg-[#f6f8fb]">
          <FlatList
            className="flex-1"
            contentContainerClassName="px-6 pb-10"
            data={warehouses ?? []}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mb-5 rounded-[22px] bg-[#f4f8f3] px-4 py-4">
                <View className="flex-row items-center">
                  <View className="mr-4 h-16 w-16 items-center justify-center rounded-xl bg-[#e9edf0]">
                    <Text className="text-[20px] font-inter-bold text-[#0b7a4d]">
                      {item.name.charAt(0)}
                    </Text>
                  </View>

                  <View className="flex-1"> 
                    <Text className="text-[16px] font-inter-bold leading-7 text-[#171a21]">
                      {item.name}
                    </Text>
                    <Text className="mt-1 text-[13px] font-inter-regular leading-5 text-[#7a8596]">
                      Address: {item.address}
                    </Text>
                  </View>

                  <View className="ml-3 flex flex-row items-center justify-between gap-8">
                    <Pressable onPress={() => handleEditWarehouse(item)}>
                      <MaterialIcons name="edit" size={24} color="#457ae5" />
                    </Pressable>
                    <Pressable onPress={() => handleDeleteWarehouse(item.name, item.id)}>
                      <MaterialIcons name="delete" size={24} color="#d85070" />
                    </Pressable>
                  </View>
                </View>
              </View>
            )}
            ListHeaderComponent={
              <View>
                <View className="mx-[-24px] mb-6 border-b border-[#e5e7eb] bg-white px-6 py-5">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[18px] font-inter-bold text-[#171a21]">Warehouses</Text>
                    <Text className="text-[20px] font-inter-semibold text-[#0b7a4d]">!</Text>
                  </View>
                </View>

                <Pressable
                  onPress={handleAddWarehouse}
                  className="mb-7 items-center rounded-[18px] bg-[#0b7a4d] px-5 py-5"
                >
                  <Text className="text-[18px] font-inter-semibold text-white">+ Add New Warehouse</Text>
                </Pressable>
              </View>
            }
            ListEmptyComponent={
              <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-8">
                <Text className="text-center text-[15px] font-inter-regular text-[#7a8596]">
                  No warehouses found
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
      <AddWarehouseSheet ref={addWarehouseBottomSheetRef} />
      <EditWarehouseSheet warehouse={selectedWarehouse} ref={editWarehouseBottomSheetRef} />
    </>
  )
}
