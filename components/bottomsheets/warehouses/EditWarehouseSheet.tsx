import { BottomSheetBackdrop, BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, Keyboard, Pressable, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { getApiErrorMessage } from "@/lib/api-error";
import { queryClient } from "@/lib/queryclient";
import { queryKeys } from "@/lib/queryKeys";
import { UpdateWarehouseRequest, Warehouse } from "@/models/zodSchema/warehouse.schema";
import { useEditWarehouse } from "@/hooks/mutation/update/useEditWarehouse";

type EditWarehouseSheetProps = {
  warehouse: Warehouse | null;
}

const EditWarehouseSheet = forwardRef<BottomSheetModal, EditWarehouseSheetProps>(
  function EditWarehouseSheet({ warehouse }, ref) {
    const snapPoints = useMemo(() => ["85%"], []);

    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, isDirty, dirtyFields },
    } = useForm<UpdateWarehouseRequest>({
      defaultValues: {
        name: "",
        address: "",
      },
    });

    const editWarehouseMutation = useEditWarehouse();

    useEffect(() => {
      if (!warehouse) return;

      reset({
        name: warehouse.name ?? "",
        address: warehouse.address ?? "",
      });


      // cleanup
      return () => {
        reset({
          name:  "",
          address: "",
        });
      }
    }, [warehouse, reset]);

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

    const onSubmit = (data: UpdateWarehouseRequest) => {
      Keyboard.dismiss();

      if (!warehouse) {
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


      const request: UpdateWarehouseRequest = {
        name: "",
        address: "",
      };
  

      if (dirtyFields.name) request.name = data.name; 
      if (dirtyFields.address) request.address = data.address;

      editWarehouseMutation.mutate(
        { warehouseID: warehouse.id, payload: request },
        {
          onSuccess: (updatedWarehouse, _, context) => {
            queryClient.setQueryData(queryKeys.warehouses, (old: Warehouse[]) => {
              return old.map((item) => item.id === context?.optimisticWarehouse?.id ? updatedWarehouse : item);
            });
            Toast.show({
              type: "success",
              text1: "Warehouse updated",
              position: "bottom",
              visibilityTime: 3000,
              autoHide: true,
            });
            reset();
            (
              ref as React.RefObject<BottomSheetModal>
            )?.current?.dismiss();
          },
          onError: (error) => {
            Toast.show({
              type: "error",
              text1: "Failed to update warehouse",
              text2: getApiErrorMessage(error, "Please try again"),
              position: "bottom",
              visibilityTime: 3000,
              autoHide: true,
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
            <Text className="text-[18px] font-bold text-[#171a21]">Edit Warehouse</Text>
            <Text className="mt-2 text-[14px] leading-6 text-[#7a8596]">
              Update the warehouse fields you want to change.
            </Text>
          </View>

          <View className="mb-5 rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
            <Text className="mb-5 text-[16px] font-bold text-[#171a21]">
              Warehouse Information
            </Text>

            <Text className="mb-2 text-[14px] text-[#7a8596]">Warehouse Name</Text>
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

            <Text className="mb-2 text-[14px] text-[#7a8596]">Warehouse Address</Text>
            <Controller
              control={control}
              name="address"
              render={({ field }) => (
                <TextInput
                  value={field.value}
                  onChangeText={field.onChange}
                  className="mb-4 rounded-2xl border border-[#b7c7bf] bg-white px-4 py-4 text-[16px] text-[#171a21]"
                />
              )}
            />
            {errors.address && <Text className="mb-3 text-[13px] text-red-500">{errors.address.message}</Text>}

          </View>

          <View className="rounded-[22px] border border-[#e6ebf1] bg-white px-5 py-5">
            <Text className="mb-5 text-[16px] font-bold text-[#171a21]">Save Warehouse</Text>

            <Pressable
              onPress={handleSubmit(onSubmit)}
              className="items-center rounded-2xl bg-[#0b7a4d] px-5 py-4"
            >
              <Text className="text-[16px] font-semibold text-white">
                {editWarehouseMutation.isPending ? "Saving..." : "Save Changes"}
              </Text>
            </Pressable>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default EditWarehouseSheet;

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
