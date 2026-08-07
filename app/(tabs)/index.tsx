import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDashboardStats } from '@/hooks/query/useDashboardStats';
import { useStockMovmentHistory } from '@/hooks/query/useStockMovmentHistory';

export default function DashboardScreen() {
  const { data: dashboardStats, isPending: isDashboardStatsPending, isError: isDashboardStatsError } = useDashboardStats();
  const { data, isPending: isStockMovementHistoryPending, isError: isStockMovementHistoryError } = useStockMovmentHistory({ limit: 3 });
  if (isDashboardStatsPending || isStockMovementHistoryPending) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (isDashboardStatsError || isStockMovementHistoryError) {
    return <View>
      <Text>Error loading dashboard stats</Text>
    </View>;
  }

  const stockMovementHistory = data?.pages[0]?.data ?? [];
  return (
    <SafeAreaView>
      <View>
        <Text>Index</Text>
        <Text>{dashboardStats?.current_inventory}</Text>
        <Text>{dashboardStats?.low_stock_products}</Text>
        <Text>{dashboardStats?.out_of_stock_products}</Text>
      </View>

      <View>
        <Text>Stock Movement History</Text>
        <FlatList
          data={stockMovementHistory}
          renderItem={({ item }) => {
            return <Text>{item.product_name}</Text>
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  )
}