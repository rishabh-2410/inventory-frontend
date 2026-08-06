import {BottomSheetBackdrop,BottomSheetModal,BottomSheetView,} from "@gorhom/bottom-sheet";
import { forwardRef, RefObject, useCallback,useEffect,useMemo, useState } from "react";
import {FlatList, Pressable, StyleSheet,Text} from "react-native";
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
              data={products}
              renderItem={({ item} : {item: Product}) => {
                return (
                  <Pressable
                    onPress={() => {
                        onSelectProduct(item);
                    }}
                  >
                    <Text>{item.name}</Text>
                  </Pressable>
                )
              }}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={<Text>No products found</Text>}
              ListHeaderComponent={() => <Text>Products</Text>}
              showsVerticalScrollIndicator={false}
            />
          </BottomSheetView>
        </BottomSheetModal>
      );
    }
  );
  
  export default ListProductSheet;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 30,
    },
  });