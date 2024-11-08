import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {BoldText, MediumText, RegularText} from "@/components/StyledText";

const EditEnergyBurnGoal = () => {
    const [energyBurn, setEnergyBurn] = useState(0);

    const increment = () => {
        setEnergyBurn(energyBurn + 100);
    };

    const decrement = () => {
        if (energyBurn > 0) setEnergyBurn(energyBurn - 100);
    };

    return (
        <View className="flex-1 p-5 justify-between">
            <View className="flex-1 items-center justify-center">
                <BoldText className="text-6xl font-bold text-gray-800">{energyBurn}</BoldText>
                <MediumText className="text-lg text-gray-800">cal per day</MediumText>

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

export default EditEnergyBurnGoal;
