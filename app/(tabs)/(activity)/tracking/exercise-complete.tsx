import {Image, TouchableOpacity, View} from "react-native";
import {Href, useLocalSearchParams, useRouter} from "expo-router";
import {MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import _ from "lodash";
import moment from "moment/moment";
import {exerciseData} from "@/constants/config";
import React from "react";

const ExerciseCompleteScreen = () => {
    const {exerciseType, distance, duration} = useLocalSearchParams();
    const router = useRouter();

    const { strideLength, caloriesPerKm } = exerciseData[exerciseType];

    const steps = strideLength > 0 ? Math.round(distance / strideLength) : 0;
    const calories = (caloriesPerKm * (distance / 1000)).toFixed(2);

    const formatValue = (seconds: number) => moment.utc(moment.duration(seconds, 's').asMilliseconds()).format('mm:ss')

    return (
        <View className='w-full h-full px-4'>
            <View className='w-screen h-1/2'>
                <Image source={require('../../../../assets/images/Jogging.png')} className='w-full h-full'/>
            </View>
            <View
                className='flex-row justify-between items-center bg-white rounded-2xl p-4 mb-2'
            >
                <SemiBoldText className='text-lg'>Distance</SemiBoldText>
                <MediumText
                    className='text-4xl align-baseline'>{(_.round(parseInt(distance as string)) / 1000).toFixed(2)} km</MediumText>
            </View>
            <View
                className='flex-row justify-between items-center bg-white rounded-2xl p-4 mb-2'
            >
                <SemiBoldText className='text-lg'>Duration</SemiBoldText>
                <MediumText
                    className='text-4xl align-baseline'>{formatValue(parseInt(duration as string))} min</MediumText>
            </View>
            <View
                className='flex-row justify-between items-center bg-white rounded-2xl p-4 mb-2'
            >
                <SemiBoldText className='text-lg'>Steps</SemiBoldText>
                <MediumText className='text-4xl align-baseline'>{steps}</MediumText>
            </View>
            <View
                className='flex-row justify-between items-center bg-white rounded-2xl p-4 mb-2'
            >
                <SemiBoldText className='text-lg'>Calories Burned</SemiBoldText>
                <MediumText className='text-4xl align-baseline'>{calories} cal</MediumText>
            </View>
            <View className='flex-row justify-end mt-4'>
                <TouchableOpacity className="bg-primary p-3 rounded-full w-28" onPress={() => router.replace('/(activity)/activity')}>
                    <RegularText className="text-white text-center text-lg">Done</RegularText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ExerciseCompleteScreen;
