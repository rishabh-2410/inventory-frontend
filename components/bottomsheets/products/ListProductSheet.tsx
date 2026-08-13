import {BottomSheetBackdrop,BottomSheetModal,BottomSheetScrollView, BottomSheetFlatList, BottomSheetView,} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback,useEffect,useMemo, useState } from "react";
import { Pressable, StyleSheet,Text, View} from "react-native";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";
import { Product } from "@/models/zodSchema/product.schema";
import { getProducts } from "@/services/product.service";

type ListProductSheetProps = {
  onSelectProduct: (product: Product) => void;
}

  const ListProductSheet = forwardRef<BottomSheetModal, ListProductSheetProps>(
    function ListProductSheet({ onSelectProduct }: ListProductSheetProps, ref) {
      const snapPoints = useMemo(
        () => ["60%"],
        []
      );

      const [products, setProducts] = useState<Product[]>([]);


      useEffect(() => {
        async function fetchProducts() {
          const products = await queryClient.ensureQueryData<Product[]>({
            queryKey: queryKeys.products,
            queryFn: () => getProducts(),
          });
          console.log(products);
          setProducts(products);
        }
        fetchProducts();
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
            <BottomSheetFlatList
            style={styles.container}
              data={products}
              renderItem={({ item} : {item: Product}) => {
                return (
                  <Pressable
                    onPress={() => {
                        onSelectProduct(item);
                    }}
                    className="mb-3 rounded-2xl border border-[#e6ebf1] bg-[#f8fafc] px-4 py-4"
                  >
                    <Text className="text-[16px] font-semibold text-[#171a21]">{item.name}</Text>
                    <Text className="mt-1 text-[13px] text-[#7a8596]">{item.sku}</Text>
                  </Pressable>
                )
              }}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <View className="rounded-2xl border border-[#e6ebf1] bg-[#f8fafc] px-4 py-6">
                  <Text className="text-center text-[15px] text-[#7a8596]">No products found</Text>
                </View>
              }
              contentContainerStyle={styles.scrollContent}
              ListHeaderComponent={
                <View className="mb-5">
                <Text className="text-[22px] font-bold text-[#171a21]">Select Product</Text>
                <Text className="mt-1 text-[14px] text-[#7a8596]">
                  Choose a product to continue the movement.
                </Text>
              </View>
              }
              showsVerticalScrollIndicator={false}
            />
        </BottomSheetModal>
      );
    }
  );
  
  export default ListProductSheet;
  
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
    },
    scrollContent: {
      paddingBottom: 64,
    },
  });
