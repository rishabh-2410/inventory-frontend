import { stockMovementType, StockMovementType } from "@/constants/StockMovementType";
import { Pressable, Text, View } from "react-native"

type StockMovementTypeSelectorProps = {
    selectedMovementType: StockMovementType;
    onSelectMovementType: (movementType: StockMovementType) => void;
}

export const StockMovementTypeSelector = ({ selectedMovementType, onSelectMovementType }: StockMovementTypeSelectorProps) => {
    return (
        <View className="flex-row rounded-xl bg-neutral-100 p-1">
            {stockMovementType.map((type) => {
                const isActive = selectedMovementType === type;
                return (
                    <Pressable 
                    key={type}
                    onPress={() => {
                        onSelectMovementType(type);
                    }}
                    className={`${isActive ? "bg-primary" : "bg-gray-200"} flex-1 rounded-lg p-2`}
                    >
                        <Text className={`${isActive ? "text-white" : "text-gray-800"}`}>{type}</Text>
                    </Pressable>
                )
            })}
        </View>
    )
}