import {BottomSheetBackdrop,BottomSheetModal,BottomSheetView,} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback,useMemo,} from "react";
import {StyleSheet,Text,Keyboard} from "react-native";
  
//   import {
//     Controller,
//     useForm,
//   } from "react-hook-form";
  
//   import { zodResolver } from "@hookform/resolvers/zod";
   
  
//   import {
//     AddExpenseRequest,
//     AddExpenseRequestObject,
//     addExpenseSchema,
//   } from "@/schemas/expense.schema";
//   import { categories } from "@/constants/data";
//   import { Ionicons } from "@expo/vector-icons";
//   import { useAddExpense } from "@/hooks/mutations/use-add-expense";
//   import { queryClient } from "@/lib/query-client";
  
  
  const AddProductSheet = forwardRef<BottomSheetModal>(
    function AddProductSheet(_, ref) {
      const snapPoints = useMemo(
        () => ["85%"],
        []
      );
  
    //   const {
    //     control,
    //     handleSubmit,
    //     reset,
    //     setValue,
    //     watch,
    //     formState: { errors },
    //   } = useForm<>({
    //     resolver: zodResolver(),
  
    //     defaultValues: {
    //     },
    //   });
 

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
        //   backgroundStyle={styles.background}
        //   handleIndicatorStyle={styles.handle}
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView
            style={styles.container}
          >
            <Text>
                Add Product BottomSheet
            </Text>
          </BottomSheetView>
        </BottomSheetModal>
      );
    }
  );
  
  export default AddProductSheet;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 30,
    },
  });