import {BottomSheetBackdrop,BottomSheetModal,BottomSheetView,} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback,useEffect,useMemo, useState } from "react";
import {FlatList, Pressable, StyleSheet,Text, View} from "react-native";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";
import { Category } from "@/models/zodSchema/category.schema";
import { getCategory } from "@/services/category.service";

type ListCategorySheetProps = {
  onSelectCategory: (category: Category) => void;
}

  const ListCategorySheet = forwardRef<BottomSheetModal, ListCategorySheetProps>(
    function ListCategorySheet({ onSelectCategory }: ListCategorySheetProps, ref) {
      const snapPoints = useMemo(
        () => ["55%"],
        []
      );

      const [categories, setCategories] = useState<Category[]>([]);


      useEffect(() => {
        async function fetchProducts() {
          const categories = await queryClient.ensureQueryData<Category[]>({
            queryKey: queryKeys.categories,
            queryFn: () => getCategory(),
          });
          console.log(categories);
          setCategories(categories);
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
          stackBehavior="push"
        >
          <BottomSheetView
            style={styles.container}
          >
            <View className="mb-5">
              <Text className="text-[22px] font-inter-bold text-[#171a21]">Select Category</Text>
              <Text className="mt-1 text-[14px] font-inter-regular text-[#7a8596]">
                Choose a category to continue the movement.
              </Text>
            </View>
            <FlatList
              data={categories}
              renderItem={({ item} : {item: Category}) => {
                return (
                  <Pressable
                    onPress={() => {
                        onSelectCategory(item);
                    }}
                    className="mb-3 rounded-2xl border border-[#e6ebf1] bg-[#f8fafc] px-4 py-4"
                  >
                    <Text className="text-[16px] font-inter-semibold text-[#171a21]">{item.name}</Text>
                    <Text className="mt-1 text-[13px] font-inter-regular text-[#7a8596]">{item.description}</Text>
                  </Pressable>
                )
              }}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={
                <View className="rounded-2xl border border-[#e6ebf1] bg-[#f8fafc] px-4 py-6">
                  <Text className="text-center text-[15px] font-inter-regular text-[#7a8596]">No categories found</Text>
                </View>
              }
              showsVerticalScrollIndicator={false}
            />
          </BottomSheetView>
        </BottomSheetModal>
      );
    }
  );
  
  export default ListCategorySheet;
  
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
