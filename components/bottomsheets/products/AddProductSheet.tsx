import {BottomSheetBackdrop,BottomSheetModal,BottomSheetScrollView,} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback,useMemo, useRef, useState,} from "react";
import {Controller, useForm} from "react-hook-form";
import {StyleSheet,Text, Pressable, TextInput, View} from "react-native";
import ListCategorySheet from "../categories/ListCategorySheet";
import { Category } from "@/models/zodSchema/category.schema";
import { AddProductRequest, addProductSchema, Product } from "@/models/zodSchema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProduct } from "@/hooks/mutation/add/useAddProduct";
import Toast from "react-native-toast-message";
import { queryKeys } from "@/lib/queryKeys";
import { queryClient } from "@/lib/queryclient";
  
  
  const AddProductSheet = forwardRef<BottomSheetModal>(
    function AddProductSheet(_, ref) {
      const snapPoints = useMemo(
        () => ["95%"],
        []
      );

      const categorySheetRef = useRef<BottomSheetModal>(null);
      const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

      const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(addProductSchema),
        defaultValues: {
          name: "",
          sku: "",
          category_id: "",
          selling_price: 0,
          cost_price: 0,
          image_url: "",
        },
      });

      

    const handleSelectCategory = (category: Category) => {
      setValue("category_id", category.id);
      setSelectedCategory(category);
      categorySheetRef.current?.dismiss();
    };
 

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
  
  const addProductMutation = useAddProduct();
  
    const onSubmit = ( data: AddProductRequest) => {
        console.log("Add products submitted", data)
        addProductMutation.mutate(data, {
          onSuccess: (savedProduct, _ , context) => {
            queryClient.setQueryData(queryKeys.products, (old: Product[]) => old.map((item: Product) => item.id === context?.optimisticProduct?.id ? savedProduct : item)
            );
            reset();
            (
              ref as React.RefObject<BottomSheetModal>
            ).current?.dismiss();
            Toast.show({
              type: "success",
              text1: "Product added successfully",
              position: "bottom",
              visibilityTime: 3000,
              autoHide: true,
            });

          },
        });
  
    };
  
      return (
        <><BottomSheetModal
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
          <BottomSheetScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
              <View className="mb-8">
                <Text className="text-[18px] font-inter-bold text-[#171a21]">Add New Product</Text>
                <Text className="mt-2 text-[14px] font-inter-regular leading-6 text-[#7a8596]">
                  Create a new entry in your global inventory catalog.
                </Text>
              </View>

              <View className="mb-5 rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
                <Text className="mb-5 text-[16px] font-inter-bold text-[#171a21]">
                  General Information
                </Text>

                <Text className="mb-2 text-[14px] font-inter-medium text-[#7a8596]">Product Name</Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      autoCapitalize="none"
                      autoCorrect={false}
                      autoComplete="off"
                      className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] font-inter-regular text-[#171a21]"
                    />
                  )}
                />
                {errors.name && <Text className="mb-3 text-[13px] font-inter-regular text-red-500">{errors.name.message}</Text>}

                <Text className="mb-2 text-[14px] font-inter-medium text-[#7a8596]">SKU / Serial Number</Text>
                <Controller
                  control={control}
                  name="sku"
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] font-inter-regular text-[#171a21]"
                    />
                  )}
                />
                {errors.sku && <Text className="mb-3 text-[13px] font-inter-regular text-red-500">{errors.sku.message}</Text>}

                <Text className="mb-2 text-[14px] font-inter-medium text-[#7a8596]">Category</Text>
                <Controller
                  control={control}
                  name="category_id"
                  render={({ field }) => (
                    <View className="mb-4 flex-row items-center justify-between rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4">
                      <Pressable
                        onPress={() => categorySheetRef.current?.present()}>
                        <Text className="flex-1 text-[16px] font-inter-regular text-[#171a21]">{selectedCategory?.name ??  "Select Category"}</Text>
                      </Pressable>
                    </View>
                  )}
                />
                {errors.category_id && <Text className="mb-3 text-[13px] font-inter-regular text-red-500">{errors.category_id.message}</Text>}

                <Text className="mb-2 text-[14px] font-inter-medium text-[#7a8596]">Selling Price</Text>
                <Controller
                  control={control}
                  name="selling_price"
                  render={({ field }) => (
                    <TextInput
                      keyboardType="numeric"
                      value={field.value.toString()}
                      onChangeText={(text) => field.onChange(Number(text))}
                      className="rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] font-inter-regular text-[#171a21]"
                    />
                  )}
                /> 
                {errors.selling_price && <Text className="mt-3 text-[13px] font-inter-regular text-red-500">{errors.selling_price.message}</Text>}


                <Text className="mb-2 mt-4 text-[14px] font-inter-medium text-[#7a8596]">Cost Price</Text>
                <Controller
                  control={control}
                  name="cost_price"
                  render={({ field }) => (
                    <TextInput
                      keyboardType="numeric"
                      value={field.value.toString()}
                      onChangeText={(text) => field.onChange(Number(text))}
                      className="rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] font-inter-regular text-[#171a21]"
                    />
                  )}
                /> 
                {errors.cost_price && <Text className="mt-3 text-[13px] font-inter-regular text-red-500">{errors.cost_price.message}</Text>}
              </View>
              
              {/* TODO: Add product image upload */}
              {/* <View className="mb-5 rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
                <Text className="mb-5 text-[16px] font-inter-bold text-[#171a21]">Product Photo</Text>

                <View className="items-center rounded-[20px] border border-dashed border-[#b7c7bf] bg-[#f4f8f3] px-5 py-12">
                  <Text className="text-[16px] font-inter-semibold text-[#171a21]">Drop image here</Text>
                  <Text className="mt-2 text-[14px] font-inter-regular text-[#7a8596]">or click to browse files</Text>
                  <Text className="mt-4 text-[13px] font-inter-regular text-[#98a2b3]">PNG, JPG UP TO 10MB</Text>
                </View>

                <View className="mt-5 flex-row items-center">
                  <Pressable className="flex-1 items-center rounded-2xl bg-[#eef4ef] px-4 py-4">
                    <Text className="text-[16px] font-inter-semibold text-[#171a21]">Edit Image</Text>
                  </Pressable>
                  <Pressable className="ml-3 h-14 w-14 items-center justify-center rounded-2xl border border-[#ffd3d7] bg-white">
                    <Text className="text-[20px] font-inter-medium text-[#ff4d57]">⌫</Text>
                  </Pressable>
                </View>
              </View> */}

              <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
                <Text className="mb-5 text-[16px] font-inter-bold text-[#171a21]">Publishing</Text>

                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  className="items-center rounded-2xl bg-[#0b7a4d] px-5 py-4"
                >
                  <Text className="text-[16px] font-inter-semibold text-white">Save Product</Text>
                </Pressable>

                <Pressable className="mt-4 items-center rounded-2xl bg-[#eef4ef] px-5 py-4" onPress={() => (ref as React.RefObject<BottomSheetModal>)?.current?.dismiss()}>
                  <Text className="text-[16px] font-inter-semibold text-[#0b7a4d]">Cancel & Discard</Text>
                </Pressable>
              </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
        <ListCategorySheet ref={categorySheetRef} onSelectCategory={handleSelectCategory} />
        </>
      );
    }
  );
  
  export default AddProductSheet;
  
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
