import {BottomSheetBackdrop,BottomSheetModal,BottomSheetScrollView,} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback,useMemo,} from "react";
import {Controller, useForm} from "react-hook-form";
import {StyleSheet,Text,Keyboard, Pressable, TextInput, View} from "react-native";

type AddProductForm = {
  name: string;
  sku: string;
  category: string;
  description: string;
}
  
  
  const AddProductSheet = forwardRef<BottomSheetModal>(
    function AddProductSheet(_, ref) {
      const snapPoints = useMemo(
        () => ["85%"],
        []
      );

      const {
        control,
        handleSubmit,
        formState: { errors },
      } = useForm<AddProductForm>({
        defaultValues: {
          name: "",
          sku: "",
          category: "",
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
  
    const onSubmit = ( data: any) => {
        Keyboard.dismiss() // close keyboard when submit button is clicked
        console.log("Add products submitted", data)
  
      };
  
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
          <BottomSheetScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
              <View className="mb-8">
                <Text className="text-[18px] font-bold text-[#171a21]">Add New Product</Text>
                <Text className="mt-2 text-[14px] leading-6 text-[#7a8596]">
                  Create a new entry in your global inventory catalog.
                </Text>
              </View>

              <View className="mb-5 rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
                <Text className="mb-5 text-[16px] font-bold text-[#171a21]">
                  General Information
                </Text>

                <Text className="mb-2 text-[14px] text-[#7a8596]">Product Name</Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] text-[#171a21]"
                    />
                  )}
                />
                {errors.name && <Text className="mb-3 text-[13px] text-red-500">{errors.name.message}</Text>}

                <Text className="mb-2 text-[14px] text-[#7a8596]">SKU / Serial Number</Text>
                <Controller
                  control={control}
                  name="sku"
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] text-[#171a21]"
                    />
                  )}
                />
                {errors.sku && <Text className="mb-3 text-[13px] text-red-500">{errors.sku.message}</Text>}

                <Text className="mb-2 text-[14px] text-[#7a8596]">Category</Text>
                <Controller
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <View className="mb-4 flex-row items-center justify-between rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4">
                      <TextInput
                        value={field.value}
                        onChangeText={field.onChange}
                        className="flex-1 text-[16px] text-[#171a21]"
                      />
                      <Text className="ml-3 text-[16px] text-[#7a8596]">⌄</Text>
                    </View>
                  )}
                />
                {errors.category && <Text className="mb-3 text-[13px] text-red-500">{errors.category.message}</Text>}

                <Text className="mb-2 text-[14px] text-[#7a8596]">Description</Text>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextInput
                      value={field.value}
                      onChangeText={field.onChange}
                      multiline
                      textAlignVertical="top"
                      className="min-h-[108px] rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] leading-7 text-[#171a21]"
                    />
                  )}
                />
                {errors.description && <Text className="mt-3 text-[13px] text-red-500">{errors.description.message}</Text>}
              </View>

              <View className="mb-5 rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
                <Text className="mb-5 text-[16px] font-bold text-[#171a21]">Product Photo</Text>

                <View className="items-center rounded-[20px] border border-dashed border-[#b7c7bf] bg-[#f4f8f3] px-5 py-12">
                  <Text className="text-[16px] font-semibold text-[#171a21]">Drop image here</Text>
                  <Text className="mt-2 text-[14px] text-[#7a8596]">or click to browse files</Text>
                  <Text className="mt-4 text-[13px] text-[#98a2b3]">PNG, JPG UP TO 10MB</Text>
                </View>

                <View className="mt-5 flex-row items-center">
                  <Pressable className="flex-1 items-center rounded-2xl bg-[#eef4ef] px-4 py-4">
                    <Text className="text-[16px] font-semibold text-[#171a21]">Edit Image</Text>
                  </Pressable>
                  <Pressable className="ml-3 h-14 w-14 items-center justify-center rounded-2xl border border-[#ffd3d7] bg-white">
                    <Text className="text-[20px] text-[#ff4d57]">⌫</Text>
                  </Pressable>
                </View>
              </View>

              <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
                <Text className="mb-5 text-[16px] font-bold text-[#171a21]">Publishing</Text>

                <Pressable
                  onPress={handleSubmit(onSubmit)}
                  className="items-center rounded-2xl bg-[#0b7a4d] px-5 py-4"
                >
                  <Text className="text-[16px] font-semibold text-white">Save Product</Text>
                </Pressable>

                <Pressable className="mt-4 items-center rounded-2xl bg-[#eef4ef] px-5 py-4">
                  <Text className="text-[16px] font-semibold text-[#0b7a4d]">Cancel & Discard</Text>
                </Pressable>
              </View>
          </BottomSheetScrollView>
        </BottomSheetModal>
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
