import { router } from 'expo-router'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function RegisterScreen() {
  return (
    <SafeAreaView>
    <View>
        <Text>signup</Text>
      <Button title="Register" onPress={() => {
        router.navigate('/setup-business')
      }} />
      </View>
    </SafeAreaView>
  )
}
