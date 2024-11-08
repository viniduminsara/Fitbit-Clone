import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {BoldText, MediumText, RegularText} from "@/components/StyledText";

const EditExerciseDays = () => {
    const [days, setDays] = useState(5);

    const incrementDays = () => {
        if (days < 7) setDays(days + 1);
    };

    const decrementDays = () => {
        if (days > 1) setDays(days - 1);
    };

    return (
        <View className="flex-1 p-5 justify-between">
            <View className="flex-1 items-center justify-center">
                <BoldText className="text-6xl font-bold text-gray-800">{days}</BoldText>
                <MediumText className="text-lg text-gray-800">days per week</MediumText>

                <View className="flex-row mt-5">
                    <TouchableOpacity
                        className="w-40 h-12 bg-gray-200 justify-center items-center rounded-lg mr-2"
                        onPress={decrementDays}
                    >
                        <Text className="text-2xl text-gray-800">-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="w-40 h-12 bg-gray-200 justify-center items-center rounded-lg"
                        onPress={incrementDays}
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

export default EditExerciseDays;
