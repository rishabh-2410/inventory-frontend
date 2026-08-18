import { stockMovementType, StockMovementType } from "@/constants/StockMovementType";
import { Pressable, Text, View } from "react-native"

type StockMovementTypeSelectorProps = {
    selectedMovementType: StockMovementType;
    onSelectMovementType: (movementType: StockMovementType) => void;
}

export const StockMovementTypeSelector = ({ selectedMovementType, onSelectMovementType }: StockMovementTypeSelectorProps) => {
    return (
        <View className="flex-row rounded-2xl bg-[#f4f8f3] p-1">
            {stockMovementType.map((type) => {
                const isActive = selectedMovementType === type;
                return (
                    <Pressable 
                    key={type}
                    onPress={() => {
                        onSelectMovementType(type);
                    }}
                    className={`flex-1 items-center rounded-[14px] px-2 py-3 ${isActive ? "bg-white" : "bg-transparent"}`}
                    >
                        <Text className={`text-[15px] font-inter-semibold ${isActive ? "text-[#0b7a4d]" : "text-[#7a8596]"}`}>
                            {type.charAt(0) + type.slice(1).toLowerCase()}
                        </Text>
                    </Pressable>
                )
            })}
        </View>
    )
}
