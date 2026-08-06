import { View, Text, Button } from 'react-native'
import { useRef } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { SafeAreaView } from 'react-native-safe-area-context'
import AddWarehouseSheet from '@/components/bottomsheets/warehouses/AddWarehouseSheet'
import EditWarehouseSheet from '../components/bottomsheets/warehouses/EditWarehouseSheet'





export default function WarehouseScreen() {
  const addWarehouseBottomSheetRef = useRef<BottomSheetModal>(null) 
  const editWarehouseBottomSheetRef = useRef<BottomSheetModal>(null) 

  const handleAddWarehouse = () => {
    addWarehouseBottomSheetRef.current?.present()
  }

  const handleEditWarehouse = () => {
    editWarehouseBottomSheetRef.current?.present()
  }
  return (
    <SafeAreaView>
      <View>
      <Text>WarehouseScreen</Text>
      <Button title="Add Warehouse" onPress={handleAddWarehouse} />
      <Button title="Edit Warehouse" onPress={handleEditWarehouse} />
      <AddWarehouseSheet ref={addWarehouseBottomSheetRef} />
      <EditWarehouseSheet ref={editWarehouseBottomSheetRef} />
      </View>
    </SafeAreaView>
  )
}