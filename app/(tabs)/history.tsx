import { useStockMovmentHistory } from '@/hooks/query/useStockMovmentHistory';
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
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-white">
      <FlatList
          className="p-4"
          data={stockMovementHistory}
          renderItem={({ item }) => {
            return (
              <View key={item.id} className="flex-row justify-between items-center bg-gray-100 p-4 rounded-md gap-4">
                <Text>{item.product_name}</Text>
                <Text>{item.movement_quantity}</Text>
              </View>
            )
          }}  
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={() => {
            return (
              <View className="flex-row justify-between items-center">
                <Text>Product Name</Text>
                <Text>Movement Quantity</Text>
              </View>
        );
          }}
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