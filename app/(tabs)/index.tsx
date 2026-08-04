import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDashboardStats } from '@/hooks/query/useDashboardStats';

export default function DashboardScreen() {
  const { data: dashboardStats, isPending, isError } = useDashboardStats();
  if (isPending) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (isError) {
    return <View>
      <Text>Error loading dashboard stats</Text>
    </View>;
  }
  return (
    <SafeAreaView>
      <View>
        <Text>Index</Text>
      </View>
    </SafeAreaView>
  )
}