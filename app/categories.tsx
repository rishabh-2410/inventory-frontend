import { View, Text, Button } from 'react-native'
import React, { useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddCategorySheet from '../components/bottomsheets/categories/AddCategorySheet'
import EditCategorySheet from '../components/bottomsheets/categories/EditCategorySheet'

export default function CategoryScreen() {
  const addCategoryBottomSheetRef = useRef<BottomSheetModal>(null) 
  const editCategoryBottomSheetRef = useRef<BottomSheetModal>(null) 

  
  const handleAddCategory = () => {
    addCategoryBottomSheetRef.current?.present()
  }
  
  const handleEditCategory = () => {
    editCategoryBottomSheetRef.current?.present()
  }

  return (
    <SafeAreaView>
      <View>
      <Text>CategoryScreen</Text>
      <Button title="Add Category" onPress={handleAddCategory} />
      <Button title="Edit Category" onPress={handleEditCategory} />
      <AddCategorySheet ref={addCategoryBottomSheetRef} />
      <EditCategorySheet ref={editCategoryBottomSheetRef} />
    </View>
    </SafeAreaView>
  )
}
    