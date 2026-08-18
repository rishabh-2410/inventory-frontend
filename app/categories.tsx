import { useRef, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, Pressable, Text, View } from 'react-native'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from '@react-native-vector-icons/material-icons'
import { Category } from '@/models/zodSchema/category.schema'
import { useCategory } from '@/hooks/query/useCategory'
import AddCategorySheet from '@/components/bottomsheets/categories/AddCategorySheet'
import EditCategorySheet from '@/components/bottomsheets/categories/EditCategorySheet'
import Toast from 'react-native-toast-message'
import { useDeleteCategory } from '@/hooks/mutation/delete/useDeleteCategory'

export default function CategoryScreen() {
  const addCategoryBottomSheetRef = useRef<BottomSheetModal>(null)
  const editCategoryBottomSheetRef = useRef<BottomSheetModal>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const deleteCategoryMutation = useDeleteCategory()

  const handleAddCategory = () => {
    addCategoryBottomSheetRef.current?.present()
  }


  const handleDeleteCategory = ( name: string, categoryID: string ) => {

    Alert.alert(
      'Delete category',
      `Delete "${name}"? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteCategoryMutation.mutate(categoryID, {
            onSuccess: () => {
              Toast.show({
                type: "success",
                text1: "Category deleted successfully",
                visibilityTime: 3000,
                position: "bottom",
                autoHide: true,
              })
            }
          }),
        },
      ]
    )
  }

  const handleEditCategory = (item: Category) => {  
    setSelectedCategory(item)
    editCategoryBottomSheetRef.current?.present()
  }

  const { data: categories, isLoading, isError } = useCategory()


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0b7a4d" />
  }

  if (isError) {
    return <View>
      <Text>Error loading categories</Text>
    </View>;
  }

  return (
    <>
      <SafeAreaView className="flex-1 bg-[#f6f8fb]">
        <View className="flex-1 bg-[#f6f8fb]">
          <FlatList
            className="flex-1"
            contentContainerClassName="px-6 pb-10"
            data={categories ?? []}
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
                     {item.description ? `Description: ${item.description}` : 'No description'}
                    </Text>
                  </View>

                  <View className="ml-3 flex flex-row items-center justify-between gap-8">
                    <Pressable onPress={() => handleEditCategory(item)}>
                      <MaterialIcons name="edit" size={24} color="#457ae5" />
                    </Pressable>
                    <Pressable onPress={() => handleDeleteCategory(item.name, item.id)}>
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
                    <Text className="text-[18px] font-bold text-[#171a21]">Categories</Text>
                    <Text className="text-[20px] text-[#0b7a4d]">!</Text>
                  </View>
                </View>

                <Pressable
                  onPress={handleAddCategory}
                  className="mb-7 items-center rounded-[18px] bg-[#0b7a4d] px-5 py-5"
                >
                  <Text className="text-[18px] font-semibold text-white">+ Add New Category</Text>
                </Pressable>
              </View>
            }
            ListEmptyComponent={
              <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-8">
                <Text className="text-center text-[15px] text-[#7a8596]">
                  No warehouses found
                </Text>
              </View>
            }
          />
        </View>
      </SafeAreaView>
      <AddCategorySheet ref={addCategoryBottomSheetRef} />
      <EditCategorySheet category={selectedCategory} ref={editCategoryBottomSheetRef} />
    </>
  )
}
