import ListProductSheet from '@/components/bottomsheets/products/ListProductSheet';
import ListWarehouseSheet from '@/components/bottomsheets/warehouses/ListWarehouseSheet';
import { StockMovementTypeSelector } from '@/components/segmentControl/StockMovementTypeSelector'
import { StockMovementType } from '@/constants/StockMovementType';
import { useStockMovement } from '@/hooks/mutation/add/useStockMovement';
import { queryClient } from '@/lib/queryclient';
import { queryKeys } from '@/lib/queryKeys';
import { Product } from '@/models/zodSchema/product.schema';
import { StockMovementRequest, stockMovementRequestSchema } from '@/models/zodSchema/stockMovement.schema';
import { Warehouse } from '@/models/zodSchema/warehouse.schema';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
export default function MovementScreen() {

  const listProductSheetRef = useRef<BottomSheetModal>(null);
  const listWarehouseSheetRef = useRef<BottomSheetModal>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    resolver: zodResolver(stockMovementRequestSchema),
    defaultValues: {
      product_id: "",
      warehouse_id: "",
      movement_quantity: 0,
      movement_type: "RECEIVE",
      reason: "",
    },
  });

  const stockMovementMutation = useStockMovement();
  const quantity = useWatch({ control, name: "movement_quantity" });
  
  
  
  
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setValue("product_id", product.id, { shouldValidate: true });
    listProductSheetRef.current?.dismiss();
  }

  const handleSelectWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    setValue("warehouse_id", warehouse.id, { shouldValidate: true });
    listWarehouseSheetRef.current?.dismiss();
  }

  const handleOpenProductList = () => {
    listProductSheetRef.current?.present();
  }

  const handleOpenWarehouseList = () => {
    listWarehouseSheetRef.current?.present();
  }

  const handleStockMovement = (data: StockMovementRequest) => {
    stockMovementMutation.mutate(data, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["stockMovements"] });
        queryClient.invalidateQueries({ queryKey: queryKeys.inventoryStats });
        queryClient.invalidateQueries({ queryKey: ["inventory"] });
        queryClient.invalidateQueries({ queryKey: queryKeys.dashboard });
        Toast.show({
          text1: "Stock movement recorded successfully",
          type: "success",
          position: "bottom",
          visibilityTime: 3000,
          autoHide: true,
        });
        router.navigate("/(tabs)/history");
      },
      onError: (error) => {
        console.log("Stock movement error", error);
        Toast.show({
          text1: "Failed to record stock movement",
          type: "error",
          position: "bottom",
          visibilityTime: 4000,
          autoHide: true,
        });
      },
      onSettled: () => {
        setSelectedProduct(null);
        setSelectedWarehouse(null);
        reset({
          product_id: "",
          warehouse_id: "",
          movement_quantity: 0,
          movement_type: "RECEIVE",
          reason: "",
        });
      },
    });

  }

  const parsedQuantity = Number(quantity || 0);


  return (
    <SafeAreaView className="flex-1 bg-[#f6f8fb]">
      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-10"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
    

        <View className="px-6 pt-6">
          <View className="rounded-[24px] border border-[#e6ebf1] bg-white px-6 py-6 shadow-sm">
            <View className="mb-6 flex-row items-center">
              <Text className="mr-3 text-[18px] font-semibold text-[#0b7a4d]">&lt;&gt;</Text>
              <Text className="text-[20px] font-bold text-[#171a21]">Log New Movement</Text>
            </View>

            <Controller
              control={control}
              name="movement_type"
              render={({ field }) => (
                <StockMovementTypeSelector
                  selectedMovementType={field.value as StockMovementType}
                  onSelectMovementType={(value) => field.onChange(value)}
                />
              )}
            />
            {errors.movement_type && (
              <Text className="mt-2 text-[13px] text-red-500">
                {errors.movement_type.message}
              </Text>
            )}

            <View className="mt-8">
              <Text className="mb-3 text-[13px] font-medium uppercase tracking-[1.8px] text-[#7a8596]">
                Select Product
              </Text>
              <Controller
                control={control}
                name="product_id"
                render={() => (
                  <Pressable
                    onPress={handleOpenProductList}
                    className="flex-row items-center justify-between rounded-2xl border border-[#98a2b3] bg-white px-4 py-4"
                  >
                    <Text className={`flex-1 text-[18px] ${selectedProduct ? "text-[#171a21]" : "text-[#7a8596]"}`}>
                      {selectedProduct ? selectedProduct.name : "Search or select product..."}
                    </Text>
                    <Text className="ml-3 text-[16px] text-[#667085]">⌄</Text>
                  </Pressable>
                )}
              />
              {errors.product_id && (
                <Text className="mt-2 text-[13px] text-red-500">
                  {errors.product_id.message}
                </Text>
              )}
            </View>

            <View className="mt-6">
              <Text className="mb-3 text-[13px] font-medium uppercase tracking-[1.8px] text-[#7a8596]">
                Warehouse Location
              </Text>
              <Controller
                control={control}
                name="warehouse_id"
                render={() => (
                  <Pressable
                    onPress={handleOpenWarehouseList}
                    className="flex-row items-center justify-between rounded-2xl border border-[#98a2b3] bg-white px-4 py-4"
                  >
                    <Text className={`flex-1 text-[18px] ${selectedWarehouse ? "text-[#171a21]" : "text-[#7a8596]"}`}>
                      {selectedWarehouse ? selectedWarehouse.name : "Select facility..."}
                    </Text>
                    <Text className="ml-3 text-[16px] text-[#667085]">⌄</Text>
                  </Pressable>
                )}
              />
              {errors.warehouse_id && (
                <Text className="mt-2 text-[13px] text-red-500">
                  {errors.warehouse_id.message}
                </Text>
              )}
            </View>

            <View className="mt-6">
              <Text className="mb-3 text-[13px] font-medium uppercase tracking-[1.8px] text-[#7a8596]">
                Quantity
              </Text>
              <Controller
                control={control}
                name="movement_quantity"
                render={({ field }) => (
                  <View className="flex-row items-center rounded-2xl border border-[#98a2b3] bg-white px-4 py-2">
                    <Pressable
                      onPress={() => {
                        const nextValue = Math.max(parsedQuantity - 1, 0);
                        field.onChange(nextValue);
                      }}
                      className="h-12 w-12 items-center justify-center"
                    >
                      <Text className="text-[28px] font-medium text-[#0b7a4d]">-</Text>
                    </Pressable>
                    <TextInput 
                      placeholder="1"
                      value={field.value ? String(field.value) : ""}
                      onChangeText={(text) => {
                        field.onChange(Number(text.replace(/[^0-9]/g, '') || 0));
                      }}
                      keyboardType="number-pad"
                      className="flex-1 text-center text-[26px] font-semibold text-[#171a21]"
                    />
                    <Pressable
                      onPress={() => {
                        const nextValue = Math.max(parsedQuantity, 0) + 1;
                        field.onChange(nextValue);
                      }}
                      className="h-12 w-12 items-center justify-center"
                    >
                      <Text className="text-[28px] font-medium text-[#0b7a4d]">+</Text>
                    </Pressable>
                  </View>
                )}
              />
              {errors.movement_quantity && (
                <Text className="mt-2 text-[13px] text-red-500">
                  {errors.movement_quantity.message}
                </Text>
              )}
            </View>

            <View className="mt-6">
              <Text className="mb-3 text-[13px] font-medium uppercase tracking-[1.8px] text-[#7a8596]">
                Reason / Transaction Note
              </Text>
              <Controller
                control={control}
                name="reason"
                render={({ field }) => (
                  <TextInput 
                    placeholder="Enter reason for movement or serial numbers..."
                    placeholderTextColor="#7a8596"
                    value={field.value}
                    onChangeText={field.onChange}
                    multiline
                    textAlignVertical="top"
                    className="min-h-[116px] rounded-2xl border border-[#98a2b3] bg-white px-4 py-4 text-[18px] text-[#171a21]"
                  />
                )}
              />
              {errors.reason && (
                <Text className="mt-2 text-[13px] text-red-500">
                  {errors.reason.message}
                </Text>
              )}
            </View>

            <Pressable
              onPress={handleSubmit(handleStockMovement)}
              className="mt-10 flex-row items-center justify-center rounded-2xl bg-[#0b7a4d] px-5 py-5 shadow-sm"
            >
              <Text className="text-[18px] font-semibold text-white">
                {stockMovementMutation.isPending ? "Confirming..." : "Confirm Movement"}
              </Text>
            </Pressable>
          </View>
        </View>

        <ListProductSheet ref={listProductSheetRef} onSelectProduct={handleSelectProduct} />
        <ListWarehouseSheet ref={listWarehouseSheetRef} onSelectWarehouse={handleSelectWarehouse} />
      </ScrollView>
    </SafeAreaView>
  )
}
