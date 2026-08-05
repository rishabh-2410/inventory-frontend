import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDashboardStats } from '@/hooks/query/useDashboardStats';
import { useStockMovmentHistory } from '@/hooks/query/useStockMovmentHistory';

export default function DashboardScreen() {
  const { data: dashboardStats, isPending: isDashboardStatsPending, isError: isDashboardStatsError } = useDashboardStats();
  const { data: stockMovementHistory, isPending: isStockMovementHistoryPending, isError: isStockMovementHistoryError } = useStockMovmentHistory({ limit: 3 });
  if (isDashboardStatsPending || isStockMovementHistoryPending) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (isDashboardStatsError || isStockMovementHistoryError) {
    return <View>
      <Text>Error loading dashboard stats</Text>
    </View>;
  }
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
        {
          stockMovementHistory?.map((stockMovement) => {
            return (
              <View key={stockMovement.id}>
                <Text>{stockMovement.product_name}</Text>
                <Text>{stockMovement.movement_quantity}</Text>
                <Text>{stockMovement.movement_type}</Text>
                <Text>{stockMovement.warehouse_name}</Text>
                <Text>{stockMovement.product_id}</Text>
              </View>
            )
          })
        }
      </View>
    </SafeAreaView>
  )
}