import {BottomSheetBackdrop,BottomSheetModal,BottomSheetScrollView,} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback,useMemo, useRef, useState,} from "react";
import {Controller, useForm} from "react-hook-form";
import {StyleSheet,Text, Pressable, TextInput, View} from "react-native";
import ListCategorySheet from "../categories/ListCategorySheet";
import { AddCategoryRequest, addCategorySchema, Category } from "@/models/zodSchema/category.schema";
import { AddProductRequest, addProductSchema, Product } from "@/models/zodSchema/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddProduct } from "@/hooks/mutation/add/useAddProduct";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/lib/api-error";
import { queryKeys } from "@/lib/queryKeys";
import { queryClient } from "@/lib/queryclient";
import { useAddCategory } from "@/hooks/mutation/add/useAddCategory";
  
  
  const AddCategorySheet = forwardRef<BottomSheetModal>(
    function AddCategorySheet(_, ref) {
      const snapPoints = useMemo(
        () => ["80%"],
        []
      );

      const {
        control,
        handleSubmit, 
        reset,
        formState: { errors },
      } = useForm({
        resolver: zodResolver(addCategorySchema),
        defaultValues: {
          name: "",
          description: "",
        },
      });

      
 

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
  
  const addCategoryMutation = useAddCategory();
  
    const onSubmit = ( data: AddCategoryRequest) => {
        console.log("Add category submitted", data)
        addCategoryMutation.mutate(data, {
          onSuccess: (savedCategory, _ , context) => {
            queryClient.setQueryData(queryKeys.categories, (old: Category[]) => old.map((item: Category) => item.id === context?.optimisticCategory?.id ? savedCategory : item)
            );
            reset();
            (ref as React.RefObject<BottomSheetModal>)?.current?.dismiss();
            Toast.show({
              type: "success",
              text1: "Category added successfully",
              position: "bottom",
              visibilityTime: 3000,
              autoHide: true,
            });
          },
          onError: (error, _, context) => {
            console.error("Error adding category", error);
            queryClient.setQueryData(queryKeys.categories, context?.previousCategories);
            Toast.show({
              type: "error",
              text1: "Error adding category",
              text2: getApiErrorMessage(error, "Please try again"),
              position: "bottom",
              visibilityTime: 3000,
              autoHide: true,
            });
          },
          onSettled: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.categories });
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
                <Text className="text-[18px] font-inter-bold text-[#171a21]">Add New Category</Text>
                <Text className="mt-2 text-[14px] font-inter-regular leading-6 text-[#7a8596]">
                  Create a new category for your products.
                </Text>
              </View>

              <View className="mb-5 rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
                <Text className="mb-5 text-[16px] font-inter-bold text-[#171a21]">
                  Category Information
                </Text>

                <Text className="mb-2 text-[14px] font-inter-medium text-[#7a8596]">Category Name</Text>
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

                <Text className="mb-2 text-[14px] font-inter-medium text-[#7a8596]">Description</Text>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] font-inter-regular text-[#171a21]"
                    />
                  )}
                />
                {errors.description && <Text className="mb-3 text-[13px] font-inter-regular text-red-500">{errors.description.message}</Text>}
              </View>
              

              <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
                {/* <Text className="mb-5 text-[16px] font-inter-bold text-[#171a21]">Save Category</Text> */}

                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  className="items-center rounded-2xl bg-[#0b7a4d] px-5 py-4"
                >
                  <Text className="text-[16px] font-inter-semibold text-white">Save Category</Text>
                </Pressable>

                <Pressable className="mt-4 items-center rounded-2xl bg-[#eef4ef] px-5 py-4" onPress={() => (ref as React.RefObject<BottomSheetModal>)?.current?.dismiss()}>
                  <Text className="text-[16px] font-inter-semibold text-[#0b7a4d]">Cancel & Discard</Text>
                </Pressable>
              </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
        </>
      );
    }
  );
  
  export default AddCategorySheet;
  
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
