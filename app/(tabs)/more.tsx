import { router } from 'expo-router'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MoreScreen() {
  return (
    <SafeAreaView>
      <View>
      <Text>More</Text>
        <Button title="Products" onPress={() => {
          router.push('/products')
        }} />
         <Button title="Categories" onPress={() => {
        router.push('/categories')
      }} />
       <Button title="Warehouses" onPress={() => {
        router.push('/warehouses')
      }} />
      </View>
    </SafeAreaView>
  )
}