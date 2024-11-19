import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {BoldText, MediumText, RegularText} from "@/components/StyledText";
import {useAppContext} from "@/context/AppContext";
import {Href, useRouter} from "expo-router";
import {updateUserGoals} from "@/service/userService";
import {ALERT_TYPE, Dialog, Toast} from "react-native-alert-notification";
import Spinner from "react-native-loading-spinner-overlay";

const EditEnergyBurnGoal = () => {
    const {userData, updateUserData} = useAppContext();
    const [energyBurn, setEnergyBurn] = useState(userData?.goals?.energyBurned || 0);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = () => {
        setLoading(true)
        if (userData?.uid){
            updateUserGoals(userData.uid, {energyBurned: energyBurn})
                .then((res: any) => {
                    const userData = res.data;
                    updateUserData(userData);

                    setLoading(false);
                    router.replace('/goal' as Href);
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Warning',
                        textBody: 'Goal update successful',
                        autoClose: 2000,
                    })
                }).catch((error) => {
                setLoading(false);
                Dialog.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Danger',
                    textBody: `${error.message}`,
                    button: 'close',
                })
            })
        }
    }

    const increment = () => {
        setEnergyBurn(energyBurn + 100);
    };

    const decrement = () => {
        if (energyBurn > 0) setEnergyBurn(energyBurn - 100);
    };

    return (
        <View className="flex-1 p-5 justify-between">
            <Spinner visible={isLoading} color='#08B9AF'/>
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

            <TouchableOpacity className="bg-[#018673] py-3 rounded-full items-center" onPress={handleSubmit}>
                <RegularText className="text-white font-bold">Set goal</RegularText>
            </TouchableOpacity>
        </View>
    );
}

export default EditEnergyBurnGoal;
