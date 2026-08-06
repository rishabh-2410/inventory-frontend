import {BottomSheetBackdrop,BottomSheetModal,BottomSheetView,} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback,useMemo,} from "react";
import {StyleSheet,Text,Keyboard} from "react-native";
  
  const EditWarehouseSheet = forwardRef<BottomSheetModal>(
    function EditWarehouseSheet(_, ref) {
      const snapPoints = useMemo(
        () => ["85%"],
        []
      );
  

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
            <Text>
                Edit Warehouse BottomSheet
            </Text>
          </BottomSheetView>
        </BottomSheetModal>
      );
    }
  );
  
  export default EditWarehouseSheet;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 12,
      paddingBottom: 30,
    },
  });