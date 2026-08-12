import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@react-native-vector-icons/material-icons'

import AddProductSheet from '../components/bottomsheets/products/AddProductSheet'
import EditProductSheet from '../components/bottomsheets/products/EditProductSheet'
import { getProducts } from '@/services/product.service'
import { Product } from '@/models/zodSchema/product.schema'

export default function ProductScreen() {
  const addProductBottomSheetRef = useRef<BottomSheetModal>(null)
  const editProductBottomSheetRef = useRef<BottomSheetModal>(null)

  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleAddProduct = () => {
    addProductBottomSheetRef.current?.present()
  }

  const handleEditProduct = () => {
    editProductBottomSheetRef.current?.present()
  }

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true)
        setError(null)
        const response = await getProducts()
        setProducts(response)
      } catch (err: any) {
        setError(err?.message ?? 'Failed to load products')
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0b7a4d" />
  }

  if (error) {
    return <Text>{error}</Text>
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#f6f8fb]">
        <View className="flex-1 bg-[#f6f8fb]">
          <FlatList
            className="flex-1"
            contentContainerClassName="px-6 pb-10"
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mb-5 rounded-[22px] bg-[#f4f8f3] px-4 py-4">
                <View className="flex-row items-center">
                  <View className="mr-4 h-16 w-16 items-center justify-center rounded-xl bg-[#e9edf0]">
                    <Text className="text-[20px] font-bold text-[#0b7a4d]">
                      {item.name.charAt(0)}
                    </Text>
                  </View>

                  <View className="flex-1"> 
                    <Text className="text-[16px] font-bold leading-7 text-[#171a21]">
                      {item.name}
                    </Text>
                    <Text className="mt-1 text-[13px] leading-5 text-[#7a8596]">
                      SKU: {item.sku}
                    </Text>
                  </View>

                  <View className="ml-3 flex flex-row items-center justify-between gap-4">
                    <Pressable onPress={handleEditProduct}>
                      <MaterialIcons name="edit" size={24} color="#457ae5" />
                    </Pressable>
                    <Pressable onPress={() => {}}>
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
                    <Text className="text-[18px] font-bold text-[#171a21]">Products</Text>
                    <Text className="text-[20px] text-[#0b7a4d]">!</Text>
                  </View>
                </View>

                <Pressable
                  onPress={handleAddProduct}
                  className="mb-7 items-center rounded-[18px] bg-[#0b7a4d] px-5 py-5"
                >
                  <Text className="text-[18px] font-semibold text-white">+ Add New Product</Text>
                </Pressable>
              </View>
            }
            ListEmptyComponent={
              <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-8">
                <Text className="text-center text-[15px] text-[#7a8596]">
                  No products found
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
      <AddProductSheet ref={addProductBottomSheetRef} />
      <EditProductSheet ref={editProductBottomSheetRef} />
    </>
  )
}
