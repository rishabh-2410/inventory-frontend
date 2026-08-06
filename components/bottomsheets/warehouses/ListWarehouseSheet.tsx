import {BottomSheetBackdrop,BottomSheetModal,BottomSheetView,} from "@gorhom/bottom-sheet";
import { forwardRef, RefObject, useCallback,useEffect,useMemo, useState } from "react";
import {FlatList, Pressable, StyleSheet,Text} from "react-native";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";
import { Product } from "@/models/zodSchema/product.schema";
import { getProducts } from "@/services/product.service";
import { Warehouse } from "@/models/zodSchema/warehouse.schema";
import { getWarehouses } from "@/services/warehouse.service";

type ListWarehouseSheetProps = {
  onSelectWarehouse: (warehouse: Warehouse) => void;
}

  const ListWarehouseSheet = forwardRef<BottomSheetModal, ListWarehouseSheetProps>(
    function ListWarehouseSheet({ onSelectWarehouse }: ListWarehouseSheetProps, ref) {
      const snapPoints = useMemo(
        () => ["60%"],
        []
      );

      const [warehouses, setWarehouses] = useState<Warehouse[]>([]);


      useEffect(() => {
        async function fetchWarehouses() {
            const warehouses = await queryClient.ensureQueryData<Warehouse[]>({
            queryKey: queryKeys.warehouses,
            queryFn: () => getWarehouses(),
          });
          setWarehouses(warehouses);
        }
        fetchWarehouses();
      }, []);



    const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.35}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );
  
      return (
        <BottomSheetModal
          ref={ref}
          snapPoints={snapPoints}
          enablePanDownToClose
          enableDismissOnClose
          enableDynamicSizing={false}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
        //   backgroundStyle={styles.background}
        //   handleIndicatorStyle={styles.handle}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            style={styles.container}
          >
            <Text className="text-2xl font-bold text-center">
                List Product BottomSheet
            </Text>
            <FlatList
              data={warehouses}
              renderItem={({ item} : {item: Warehouse}) => {
                return (
                  <Pressable
                    onPress={() => {
                        onSelectWarehouse(item);
                    }}
                  >
                    <Text>{item.name}</Text>
                  </Pressable>
                )
              }}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text>No warehouses found</Text>}
              ListHeaderComponent={() => <Text>Warehouses</Text>}
              showsVerticalScrollIndicator={false}
            />
          </BottomSheetView>
        </BottomSheetModal>
      );
    }
  );
  
  export default ListWarehouseSheet;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 30,
    },
  });