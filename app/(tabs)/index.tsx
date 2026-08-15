import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDashboardStats } from '@/hooks/query/useDashboardStats';
import { useStockMovmentHistory } from '@/hooks/query/useStockMovmentHistory';
import { useAuthStore } from '@/store/auth.store';


export default function DashboardScreen() {
  const businessID = useAuthStore.getState().user?.business_id ?? "";
  const { data: dashboardStats, isPending: isDashboardStatsPending, isError: isDashboardStatsError } = useDashboardStats(businessID);
  const { data, isPending: isStockMovementHistoryPending, isError: isStockMovementHistoryError } = useStockMovmentHistory(businessID, { limit: 3 });
  const user = useAuthStore.getState().user;
  if (isDashboardStatsPending || isStockMovementHistoryPending) {
    return <SafeAreaView className="flex-1 bg-[#f8fafc] items-center justify-center"> 
      <ActivityIndicator size="large" color="#0000ff" />
    </SafeAreaView>;
  }
  // if (isDashboardStatsError || isStockMovementHistoryError) {
  //   console.log("DashboardStatsError:", isDashboardStatsError)
  //   console.log("StockMovementHistoryError:", isStockMovementHistoryError)
  //   return <SafeAreaView className="flex-1 bg-[#f8fafc] items-center justify-center"> 
  //     <Text>Error loading dashboard stats</Text>
  //   </SafeAreaView>;
  // }

  const stockMovementHistory = data?.pages[0]?.data ?? [];
  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc] pt-2">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}
      >
        <View className="border-b border-[#e5e7eb] bg-white px-6 py-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="mr-4 h-12 w-12 items-center justify-center rounded-full border border-[#0b7a4d] bg-[#dff1ea]">
                <Text className="text-[18px] font-semibold text-[#0b7a4d]">IP</Text>
              </View>
              <View>
                <Text className="text-[15px] text-[#8a94a6]">Welcome back</Text>
                <Text className="text-[18px] font-bold text-[#171a21]">{user ? user.name : "Guest"}</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-6 pt-6">
          {isDashboardStatsError ? (
            <Text className="text-[16px] mt-4 text-[#7a8596]">Error loading dashboard stats</Text>
          ) : (
            <>
            <View className="mb-5 rounded-[22px] border border-[#e5e7eb] bg-white px-5 py-5 shadow-sm">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#dff1ea]">
              <Text className="text-[20px] text-[#159b67]">$</Text>
            </View>
            <Text className="mt-4 text-[16px] text-[#7a8596]">Current Inventory</Text>
            <Text className="mt-2 text-[24px] font-bold text-[#171a21]">
              {dashboardStats?.current_inventory}
            </Text>
          </View>

          <View className="mb-5 rounded-[22px] border border-[#e5e7eb] bg-white px-5 py-5 shadow-sm">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#e4efff]">
              <Text className="text-[20px] text-[#2563eb]">H</Text>
            </View>
            <Text className="mt-4 text-[16px] text-[#7a8596]">Low Stock Products</Text>
            <Text className="mt-2 text-[24px] font-bold text-[#171a21]">
              {String(dashboardStats?.low_stock_products ?? 0).padStart(2, "0")}
            </Text>
          </View>

          <View className="rounded-[22px] border border-[#e5e7eb] bg-white px-5 py-5 shadow-sm">
            <View className="h-12 w-12 items-center justify-center rounded-2xl bg-[#fce8e8]">
              <Text className="text-[20px] text-[#b54343]">T</Text>
            </View>
            <Text className="mt-4 text-[16px] text-[#7a8596]">Out Of Stock</Text>
            <Text className="mt-2 text-[24px] font-bold text-[#171a21]">
              {dashboardStats?.out_of_stock_products}
            </Text>
          </View>
            </>
          )}

          <Text className="mt-8 text-[18px] font-bold text-[#171a21]">
            Recent Movements
          </Text>

          {isStockMovementHistoryError ? (
            <Text className="text-[16px] mt-4 text-[#7a8596]">Error loading recent movements</Text>
          ) : (
            <View className="mt-4 rounded-[22px] border border-[#e5e7eb] bg-white px-5 py-5 shadow-sm">
            { stockMovementHistory.length > 0 ? stockMovementHistory.map((item, index) => {
              const isStockIn = item.movement_type === "RECEIVE"|| item.movement_type === "RETURN";
              const isStockOut = item.movement_type === "SALE"  || item.movement_type === "DAMAGE" ;
              const typeLabel = isStockIn ? "Stock In" : isStockOut ? "Stock Out" : "Transfer";
              const badgeText = isStockIn
                ? `+ ${item.movement_quantity} units received`
                : isStockOut
                  ? `- ${item.movement_quantity} units dispatched`
                  : `${item.movement_quantity} units moved`;

              return (
                <View key={item.id} className={index > 0 ? "mt-6" : ""}>
                  <View className="flex-row">
                    <View className="mr-4 items-center">
                      <View
                        className={`h-10 w-10 items-center justify-center rounded-full ${
                          isStockIn
                            ? "bg-[#dff1ea]"
                            : isStockOut
                              ? "bg-[#fce8e8]"
                              : "bg-[#e4efff]"
                        }`}
                      >
                        <Text
                          className={`text-[18px] font-semibold ${
                            isStockIn
                              ? "text-[#159b67]"
                              : isStockOut
                                ? "text-[#b54343]"
                                : "text-[#2563eb]"
                          }`}
                        >
                          {isStockIn ? "v" : isStockOut ? "^" : "<>"}
                        </Text>
                      </View>
                      {index < stockMovementHistory.length - 1 && (
                        <View className="mt-2 h-16 w-[1px] bg-[#e5e7eb]" />
                      )}
                    </View>

                    <View className="flex-1">
                      <Text className="text-[15px] font-semibold text-[#171a21]">
                        {typeLabel}: {item.product_name}
                      </Text>
                      <Text className="mt-1 text-[14px] text-[#7a8596]">
                        {item.warehouse_name} • {new Date(item.created_at).toLocaleString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </Text>
                      <View className="mt-3 self-start rounded-md border border-[#d9e4d8] bg-[#f4f8f3] px-3 py-2">
                        <Text className="text-[14px] text-[#535862]">{badgeText}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              );
            }) : (
              <Text className="text-[16px] mt-4 text-[#7a8596]">No recent movements</Text>
            )}
          </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
