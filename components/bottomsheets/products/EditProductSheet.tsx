import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, Keyboard, Pressable, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

import { Product } from "@/models/zodSchema/product.schema";
import { useEditProduct } from "@/hooks/mutation/useEditProduct";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";

type EditProductSheetProps = {
  product: Product | null;
  onProductUpdated: (product: Product) => void;
}

type EditProductForm = {
  name: string;
  sku: string;
  selling_price: string;
  cost_price: string;
  category_id: string;
  image_url: string;
}

const EditProductSheet = forwardRef<BottomSheetModal, EditProductSheetProps>(
  function EditProductSheet({ product, onProductUpdated }, ref) {
    const snapPoints = useMemo(() => ["85%"], []);

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isDirty, dirtyFields },
    } = useForm<EditProductForm>({
      defaultValues: {
        name: "",
        sku: "",
        selling_price: "",
        cost_price: "",
        category_id: "",
        image_url: "",
      },
    });

    const editProductMutation = useEditProduct();

    useEffect(() => {
      if (!product) return;

      reset({
        name: product.name ?? "",
        sku: product.sku ?? "",
        selling_price: String(product.selling_price ?? ""),
        cost_price: String(product.cost_price ?? ""),
        category_id: product.category_id ?? "",
        image_url: product.image_url ?? "",
      });


      // cleanup
      return () => {
        reset({
          name:  "",
          sku: "",
          selling_price: "0",
          cost_price: "0",
          category_id: "",
          image_url: "",
        });
      }
    }, [product, reset]);

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

    const onSubmit = (data: EditProductForm) => {
      Keyboard.dismiss();

      if (!product) {
        return;
      }

      if (!isDirty) {
        (ref as React.RefObject<BottomSheetModal>)?.current?.dismiss();
        Toast.show({
          type: "info",
          text1: "No changes to save",
          position: "bottom",
          visibilityTime: 3000,
          autoHide: true,
        });
        return;
      }


      const payload: {
        name?: string;
        sku?: string;
        selling_price?: number;
        cost_price?: number;
        category_id?: string;
        image_url?: string;
      } = {};

      if (dirtyFields.name) payload.name = data.name;
      if (dirtyFields.sku) payload.sku = data.sku;
      if (dirtyFields.selling_price) payload.selling_price = Number(data.selling_price);
      if (dirtyFields.cost_price) payload.cost_price = Number(data.cost_price);
      if (dirtyFields.category_id) payload.category_id = data.category_id;
      if (dirtyFields.image_url) payload.image_url = data.image_url;


      editProductMutation.mutate(
        { productId: product.id, request: payload },
        {
          onSuccess: (updatedProduct, _, context) => {
            queryClient.setQueryData(queryKeys.products, (old: Product[]) => {
              return old.map((product) => product.id === context?.optimisticProduct?.id ? updatedProduct : product);
            });
            Toast.show({
              type: "success",
              text1: "Product updated",
              position: "bottom",
            });
            reset();
            (
              ref as React.RefObject<BottomSheetModal>
            )?.current?.dismiss();
          },
          onError: () => {
            Toast.show({
              type: "error",
              text1: "Failed to update product",
              position: "bottom",
            });
          },
        }
      );
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
            <Text className="text-[18px] font-bold text-[#171a21]">Edit Product</Text>
            <Text className="mt-2 text-[14px] leading-6 text-[#7a8596]">
              Update the product fields you want to change.
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

            <Text className="mb-2 text-[14px] text-[#7a8596]">Selling Price</Text>
            <Controller
              control={control}
              name="selling_price"
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="decimal-pad"
                  className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] text-[#171a21]"
                />
              )}
            />

            <Text className="mb-2 text-[14px] text-[#7a8596]">Cost Price</Text>
            <Controller
              control={control}
              name="cost_price"
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  keyboardType="decimal-pad"
                  className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] text-[#171a21]"
                />
              )}
            />

            <Text className="mb-2 text-[14px] text-[#7a8596]">Category ID</Text>
            <Controller
              control={control}
              name="category_id"
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] text-[#171a21]"
                />
              )}
            />

            <Text className="mb-2 text-[14px] text-[#7a8596]">Image URL</Text>
            <Controller
              control={control}
              name="image_url"
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  className="rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] text-[#171a21]"
                />
              )}
            />
          </View>

          <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
            <Text className="mb-5 text-[16px] font-bold text-[#171a21]">Publishing</Text>

            <Pressable
              onPress={handleSubmit(onSubmit)}
              className="items-center rounded-2xl bg-[#0b7a4d] px-5 py-4"
            >
              <Text className="text-[16px] font-semibold text-white">
                {editProductMutation.isPending ? "Saving..." : "Save Changes"}
              </Text>
            </Pressable>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default EditProductSheet;

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
    paddingBottom: 30,
  },
});
