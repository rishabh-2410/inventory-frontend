import { router } from 'expo-router'
import { Button, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>Login</Text>
        <Button title="Login" onPress={() => {
          router.navigate('/')
        }} />
      </View>
    </SafeAreaView>
  )
}
