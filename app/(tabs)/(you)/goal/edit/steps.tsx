import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {BoldText, MediumText, RegularText} from "@/components/StyledText";

const EditStepsGoal = () => {
    const [steps, setSteps] = useState(0);

    const increment = () => {
        setSteps(steps + 500);
    };

    const decrement = () => {
        if (steps > 0) setSteps(steps - 500);
    };

    return (
        <View className="flex-1 p-5 justify-between">
            <View className="flex-1 items-center justify-center">
                <BoldText className="text-6xl font-bold text-gray-800">{steps}</BoldText>
                <MediumText className="text-lg text-gray-800">steps per day</MediumText>

                <View className="flex-row mt-5">
                    <TouchableOpacity
                        className="w-40 h-12 bg-gray-200 justify-center items-center rounded-lg mr-2"
                        onPress={decrement}
                    >
                        <Text className="text-2xl text-gray-800">-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-40 h-12 bg-gray-200 justify-center items-center rounded-lg"
                        onPress={increment}
                    >
                        <Text className="text-2xl text-gray-800">+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity className="bg-[#018673] py-3 rounded-full items-center">
                <RegularText className="text-white font-bold">Set goal</RegularText>
            </TouchableOpacity>
        </View>
    );
}

export default EditStepsGoal;
