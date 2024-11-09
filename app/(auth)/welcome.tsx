import {Image, Text, TouchableOpacity, View} from "react-native";
import {Href, useRouter} from "expo-router";
import ScreenLayout from "@/components/ScreenLayout";
import React from "react";
import {MediumText, RegularText, SemiBoldText} from "@/components/StyledText";

const WelcomeScreen = () => {
    const router = useRouter();

    return (
        <ScreenLayout bgColor='primary'>
            <View className='w-screen h-1/2'>
                <Image source={require('../../assets/images/welcome.jpg')} className='w-full h-full'/>
            </View>
            <View className='flex justify-end items-center w-full h-1/2 px-4'>
                <View className='flex-row justify-center items-center space-x-2'>
                    <Image source={require('../../assets/images/logo_black.png')} className='w-8 h-8'/>
                    <SemiBoldText className='text-2xl text-secondary'>fitbit</SemiBoldText>
                </View>
                <MediumText className='text-2xl text-center'>Take the next step forward a healthier, more active life</MediumText>
                <View className='w-full mt-10 mb-6'>
                    <TouchableOpacity className='bg-secondary w-full py-3 flex-row justify-center rounded-3xl mb-4'>
                        <RegularText className='text-white'>Sign in with Google</RegularText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='bg-primary w-full py-3 flex-row justify-center rounded-3xl border-2 border-secondary'
                        onPress={() => router.push('/(tabs)' as Href)}
                    >
                        <RegularText className='text-secondary'>Sign in with Fitbit</RegularText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    )
}

export default WelcomeScreen;
