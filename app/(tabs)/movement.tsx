import ListProductSheet from '@/components/bottomsheets/products/ListProductSheet';
import ListWarehouseSheet from '@/components/bottomsheets/warehouses/ListWarehouseSheet';
import { StockMovementTypeSelector } from '@/components/segmentControl/StockMovementTypeSelector'
import { StockMovementType } from '@/constants/StockMovementType';
import { useStockMovement } from '@/hooks/mutation/useStockMovement';
import { queryClient } from '@/lib/queryclient';
import { queryKeys } from '@/lib/queryKeys';
import { Product } from '@/models/zodSchema/product.schema';
import { stockMovementRequestSchema } from '@/models/zodSchema/stockMovement.schema';
import { Warehouse } from '@/models/zodSchema/warehouse.schema';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, Button } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message';
export default function MovementScreen() {

  const listProductSheetRef = useRef<BottomSheetModal>(null);
  const listWarehouseSheetRef = useRef<BottomSheetModal>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [movementType, setMovementType] = useState<StockMovementType>("RECEIVE");
  const [reason, setReason] = useState<string>("");

  const stockMovementMutation = useStockMovement();
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    listProductSheetRef.current?.dismiss();
  }

  const handleSelectWarehouse = (warehouse: Warehouse) => {
    setSelectedWarehouse(warehouse);
    listWarehouseSheetRef.current?.dismiss();
  }

  const handleOpenProductList = () => {
    listProductSheetRef.current?.present();
  }

  const handleOpenWarehouseList = () => {
    listWarehouseSheetRef.current?.present();
  }

  const handleStockMovement = () => {
    console.log("Stock movement", {
      product_id: selectedProduct?.id,
      warehouse_id: selectedWarehouse?.id,
      quantity: Number(quantity),
      movement_type: movementType,
      reason: reason,
    });

    const stockMovemenRequest = stockMovementRequestSchema.parse({
      product_id: selectedProduct?.id,
      warehouse_id: selectedWarehouse?.id,
      movement_quantity: Number(quantity),
      movement_type: movementType,
      reason: reason,
    })

    console.log("Stock movement request", stockMovemenRequest);

    stockMovementMutation.mutate(stockMovemenRequest, {
      onSuccess: (data) => {
        console.log("Stock movement success", data);
        queryClient.invalidateQueries({ queryKey: ["stockMovements"] });
        queryClient.invalidateQueries({ queryKey: [queryKeys.inventoryStats] });
        Toast.show({
          text1: "Stock movement recordedsuccessful",
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
        console.log("Stock movement settled");
        setQuantity("");
        setReason("");
        setSelectedProduct(null);
        setSelectedWarehouse(null);
        setMovementType("RECEIVE");
      },
    });

  }


  return (
    <SafeAreaView>
      <View>
        <Text>Movement</Text>
        <StockMovementTypeSelector selectedMovementType={movementType} onSelectMovementType={setMovementType} />
        {selectedProduct ? <Text>{selectedProduct.name}</Text> : <Text>No product selected</Text>}

        {selectedWarehouse ? <Text>{selectedWarehouse.name}</Text> : <Text>No warehouse selected</Text>}

        <Button title="Select Product" onPress={handleOpenProductList} />
        <Button title="Select Warehouse" onPress={handleOpenWarehouseList} />
        <ListProductSheet ref={listProductSheetRef} onSelectProduct={handleSelectProduct} />
        <ListWarehouseSheet ref={listWarehouseSheetRef} onSelectWarehouse={handleSelectWarehouse} />
        

        <TextInput 
          placeholder="Quantity"
          value={quantity}
          onChangeText={(text) => {
            // Allow only digits
            setQuantity(text.replace(/[^0-9]/g, ''));
          }}
          keyboardType="number-pad"
          style={{ borderWidth: 1, borderColor: 'gray', padding: 10, margin: 10 }}
        />

        <TextInput 
          placeholder=""
          value={reason}
          onChangeText={setReason}
          style={{ borderWidth: 1, borderColor: 'gray', padding: 10, margin: 10 }}
        />
        <Button title="Add Stock Movement" onPress={handleStockMovement} />
      </View>
    </SafeAreaView>
  )
}