import { View, Text, Button } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function SetupBusinessScreen() {
  return (
    <SafeAreaView>
      <View>
        <Text>SetupBusinessScreen</Text>
      <Button title="Setup Business" onPress={() => {
        router.navigate('/')
      }} />
      </View>
    </SafeAreaView>
  )
}

