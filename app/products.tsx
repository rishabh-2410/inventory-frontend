import { View, Text, Button } from 'react-native'
import React, { useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddProductSheet from '../components/bottomsheets/products/AddProductSheet'
import EditProductSheet from '../components/bottomsheets/products/EditProductSheet'

export default function ProductScreen() {
  const addProductBottomSheetRef = useRef<BottomSheetModal>(null) 
  const editProductBottomSheetRef = useRef<BottomSheetModal>(null) 

  const handleAddProduct = () => {
    addProductBottomSheetRef.current?.present()
  }

  const handleEditProduct = () => {
    editProductBottomSheetRef.current?.present()
  }

  return (
  <>
    <SafeAreaView>
      <View>
      <Text>ProductScreen</Text>
      <Button title="Add Product" onPress={handleAddProduct} />
      </View>
    </SafeAreaView>
    <AddProductSheet ref={addProductBottomSheetRef} />
    <EditProductSheet ref={editProductBottomSheetRef} />
  </>
  )
}