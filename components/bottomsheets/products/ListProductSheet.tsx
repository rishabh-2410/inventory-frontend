/* eslint-disable @typescript-eslint/no-unused-vars */
import {BottomSheetBackdrop,BottomSheetModal,BottomSheetScrollView, BottomSheetFlatList, BottomSheetView,} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback,useEffect,useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet,Text, View} from "react-native";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";
import { Product } from "@/models/zodSchema/product.schema";
import { getProducts } from "@/services/product.service";
import { ca } from "zod/v4/locales";

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
      const [loading, setLoading] = useState(false); 

      useEffect(() => {
        let cancelled = false;
        const loadProducts = async() => {

          setLoading(true);
          try {
            const products = await queryClient.ensureQueryData<Product[]>({
              queryKey: queryKeys.products,
              queryFn: () => getProducts(),
              revalidateIfStale: true,
            });
            console.log(products);
            if (!cancelled) setProducts(products);
          } catch (error) {
            console.error("Error loading products", error);
          } finally {
            setLoading(false);
          }
        }

        loadProducts();

        return () => {cancelled = true}
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
              data={loading ? [] : products}
              renderItem={({ item} : {item: Product}) => {
                return (
                  <Pressable
                    onPress={() => {
                        onSelectProduct(item);
                    }}
                    className="mb-3 rounded-2xl border border-[#e6ebf1] bg-[#f8fafc] px-4 py-4"
                  >
                    <Text className="text-[16px] font-inter-semibold text-[#171a21]">{item.name}</Text>
                    <Text className="mt-1 text-[13px] font-inter-regular text-[#7a8596]">{item.sku}</Text>
                  </Pressable>
                )
              }}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                loading ? <ActivityIndicator size="large" color="#0b7a4d" /> :  <View className="rounded-2xl border border-[#e6ebf1] bg-[#f8fafc] px-4 py-6">
                <Text className="text-center text-[15px] font-inter-regular text-[#7a8596]">No products found</Text>
              </View>
              }
              contentContainerStyle={styles.scrollContent}
              ListHeaderComponent={
                <View className="mb-5">
                <Text className="text-[22px] font-inter-bold text-[#171a21]">Select Product</Text>
                <Text className="mt-1 text-[14px] font-inter-regular text-[#7a8596]">
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
