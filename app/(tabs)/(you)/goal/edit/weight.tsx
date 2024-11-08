import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {BoldText, LightText, MediumText, RegularText} from "@/components/StyledText";

const EditWeightGoal = () => {
    const [weight, setWeight] = useState(0);

    const increment = () => {
        setWeight(weight + 1);
    };

    const decrement = () => {
        if (weight > 0) setWeight(weight - 1);
    };

    return (
        <View className="flex-1 p-5 justify-between">
            <View className="flex-1 items-center justify-center">
                <BoldText className="text-6xl font-bold text-gray-800">{weight}</BoldText>
                <MediumText className="text-lg text-gray-800">KILOGRAMS</MediumText>

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

            <View>
                <MediumText className='text-lg mb-2'>Tips for a healthy goal</MediumText>
                <LightText className='mb-6'>Try choosing a weight goal that can be achieved at reasonable pace.</LightText>
                <TouchableOpacity className="bg-[#018673] py-3 rounded-full items-center">
                    <RegularText className="text-white font-bold">Set goal</RegularText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default EditWeightGoal;
