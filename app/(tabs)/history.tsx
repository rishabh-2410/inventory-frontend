import { useStockMovmentHistory } from '@/hooks/query/useStockMovmentHistory';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HistoryScreen() {
  const { 
    data, 
    isPending, 
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  
  } = useStockMovmentHistory({limit: 2});

  if (isPending) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (isError) {
    return <View>
      <Text>Error loading stock movement history</Text>
    </View>;
  }
  const stockMovementHistory = data?.pages.flatMap(page => page.data) ?? [];

  return (
    <SafeAreaView className="flex-1 bg-[#f6f8fb]">
      <View className="flex-1 bg-[#f6f8fb]">
      <FlatList
          className="flex-1"
          contentContainerClassName="pb-10"
          data={stockMovementHistory}
          renderItem={({ item }) => {
            return (
              <View
                key={item.id}
                className="mb-4 rounded-[22px] border border-[#e6ebf1] bg-white px-4 py-5"
              >
                <View className="flex-row">
                  <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-[#e8f3ed]">
                    <Text className="text-[18px] font-semibold text-[#0b7a4d]">
                      {item.movement_type.charAt(0)}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-[16px] font-semibold text-[#171a21]">
                      {item.product_name}
                    </Text>
                    <Text className="mt-1 text-[14px] text-[#7a8596]">
                      {item.warehouse_name}
                    </Text>
                    <View className="mt-3 self-start rounded-md border border-[#d9e4d8] bg-[#f4f8f3] px-3 py-2">
                      <Text className="text-[14px] text-[#535862]">
                        {item.movement_type} - {item.movement_quantity}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          }}  
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => {
            return (
              <View className="mx-[-24px] mb-6 border-b border-[#e5e7eb] bg-white px-6 py-5">
              <View className="flex-row items-center justify-between px-8">
                <Text className="text-[18px] font-bold text-[#171a21]">Movement History</Text>
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#0b7a4d]">
                  <MaterialIcons name="history" size={22} color="white" />
                </View>
              </View>
            </View>
        );
          }}
          ListEmptyComponent={
            <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-8">
              <Text className="text-center text-[15px] text-[#7a8596]">
                No stock movements found
              </Text>
            </View>
          }
          onEndReached={() => {
            if (!hasNextPage) return;
            if (isFetchingNextPage) return;
            fetchNextPage()
          }}
          ListFooterComponent={() => {
            if (isFetchingNextPage) {
              return <ActivityIndicator size="large" color="#0000ff" />;
            }
            return null;
          }}
          onEndReachedThreshold={0.2}

    />
  </View>
</SafeAreaView>
  );
}
