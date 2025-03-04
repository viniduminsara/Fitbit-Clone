import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BoldText, LightText, MediumText, RegularText} from "@/components/StyledText";
import {useAppContext} from "@/context/AppContext";
import {Href, useRouter} from "expo-router";
import {updateUserGoals} from "@/service/userService";
import {ALERT_TYPE} from "react-native-alert-notification";
import Spinner from "react-native-loading-spinner-overlay";
import * as commonFunc from "../../../../../util/commonfunc";

const EditWeightGoal = () => {
    const {userData, updateUserData} = useAppContext();
    const [weight, setWeight] = useState(userData?.goals?.weight || 0);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = () => {
        setLoading(true)
        if (userData?.uid){
            updateUserGoals(userData.uid, {weight: weight})
                .then((res: any) => {
                    const userData = res.data.body;
                    updateUserData(userData);

                    setLoading(false);
                    router.replace('/goal' as Href);
                    commonFunc.showToast(ALERT_TYPE.SUCCESS, "Success", "Weight Goal update successful")
                }).catch((error) => {
                setLoading(false);
                commonFunc.showToast(ALERT_TYPE.DANGER, "Error", `${error.message}`);
            })
        }
    }

    const increment = () => {
        setWeight(weight + 1);
    };

    const decrement = () => {
        if (weight > 0) setWeight(weight - 1);
    };

    return (
        <View className="flex-1 p-5 justify-between">
            <Spinner visible={isLoading} color='#08B9AF'/>
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
                <TouchableOpacity className="bg-[#018673] py-3 rounded-full items-center" onPress={handleSubmit}>
                    <RegularText className="text-white font-bold">Set goal</RegularText>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default EditWeightGoal;
