import {BottomSheetBackdrop,BottomSheetModal,BottomSheetView,} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback,useEffect,useMemo, useState } from "react";
import {FlatList, Pressable, StyleSheet,Text, View} from "react-native";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";
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
          backgroundStyle={styles.background}
          handleIndicatorStyle={styles.handle}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            style={styles.container}
          >
            <View className="mb-5">
              <Text className="text-[22px] font-inter-bold text-[#171a21]">Select Warehouse</Text>
              <Text className="mt-1 text-[14px] font-inter-regular text-[#7a8596]">
                Choose a warehouse location for this movement.
              </Text>
            </View>
            <FlatList
              data={warehouses}
              renderItem={({ item} : {item: Warehouse}) => {
                return (
                  <Pressable
                    onPress={() => {
                        onSelectWarehouse(item);
                    }}
                    className="mb-3 rounded-2xl border border-[#e6ebf1] bg-[#f8fafc] px-4 py-4"
                  >
                    <Text className="text-[16px] font-inter-semibold text-[#171a21]">{item.name}</Text>
                    <Text className="mt-1 text-[13px] font-inter-regular text-[#7a8596]">{item.address}</Text>
                  </Pressable>
                )
              }}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <View className="rounded-2xl border border-[#e6ebf1] bg-[#f8fafc] px-4 py-6">
                  <Text className="text-center text-[15px] font-inter-regular text-[#7a8596]">No warehouses found</Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          </BottomSheetView>
        </BottomSheetModal>
      );
    }
  );
  
  export default ListWarehouseSheet;
  
  const styles = StyleSheet.create({
    background: {
      backgroundColor: "#FFFFFF",
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
    },
    handle: {
      backgroundColor: "#D0D5DD",
      width: 56,
    },
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 30,
    },
  });
