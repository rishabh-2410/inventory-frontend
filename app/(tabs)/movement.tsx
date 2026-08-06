import ListProductSheet from '@/components/bottomsheets/products/ListProductSheet';
import ListWarehouseSheet from '@/components/bottomsheets/warehouses/ListWarehouseSheet';
import { StockMovementTypeSelector } from '@/components/segmentControl/StockMovementTypeSelector'
import { Product } from '@/models/zodSchema/product.schema';
import { Warehouse } from '@/models/zodSchema/warehouse.schema';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function MovementScreen() {

  const listProductSheetRef = useRef<BottomSheetModal>(null);
  const listWarehouseSheetRef = useRef<BottomSheetModal>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);

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


  return (
    <SafeAreaView>
      <View>
        <Text>Movement</Text>
        <StockMovementTypeSelector />
        {selectedProduct ? <Text>{selectedProduct.name}</Text> : <Text>No product selected</Text>}

        {selectedWarehouse ? <Text>{selectedWarehouse.name}</Text> : <Text>No warehouse selected</Text>}

        <Button title="Select Product" onPress={handleOpenProductList} />
        <Button title="Select Warehouse" onPress={handleOpenWarehouseList} />
        <ListProductSheet ref={listProductSheetRef} onSelectProduct={handleSelectProduct} />
        <ListWarehouseSheet ref={listWarehouseSheetRef} onSelectWarehouse={handleSelectWarehouse} />
        
      </View>
    </SafeAreaView>
  )
}