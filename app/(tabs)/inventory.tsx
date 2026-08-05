import { useGetInventory } from '@/hooks/query/useGetInventory'
import { useState } from 'react'
import { View, Text, ActivityIndicator, TextInput } from 'react-native'
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
    <SafeAreaView>
      <View>
        <Text>Inventory</Text>

        <View>
          <TextInput 
            value={search}
            onChangeText={setSearch}
            placeholder="Search"
          />
        </View>
        {
          isFetching ? <ActivityIndicator size="small" /> : inventory?.map((item) => (
            <View key={item.id}>
              <Text>{item.product_name}</Text>
              <Text>{item.sku}</Text>
              <Text>{item.category_name}</Text>
              <Text>{item.warehouse_name}</Text>
              <Text>{item.current_stock}</Text>
              <Text>{item.updated_at}</Text>
            </View>
          ))
        }
      </View>
    </SafeAreaView>
  )
}