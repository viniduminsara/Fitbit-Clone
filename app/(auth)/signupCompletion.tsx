import ScreenLayout from "@/components/ScreenLayout";
import {Text, View, Image, TouchableOpacity} from "react-native";
import React from "react";
import {Href, useRouter} from "expo-router";
import {RegularText, SemiBoldText} from "@/components/StyledText";

const SignupCompletion = () => {
    const router = useRouter();

    return (
        <ScreenLayout bgColor='background'>
            <View className='w-full h-full flex justify-between mt-4 px-4 py-10'>
                <View>
                    <Image source={require('../../assets/images/tick.png')} className='w-10 h-10 mb-6'/>
                    <SemiBoldText className='text-3xl mb-2'>You're ready to go</SemiBoldText>
                    <RegularText className='text-sm text-grayText'>
                        Start using the Fitbit app on your phone to record your steps, track your
                        exercise, log your meals, and more
                    </RegularText>
                </View>
                <View className='flex justify-center items-center'>
                    <Image source={require('../../assets/images/complettion_img.png')} className='w-80 h-96'/>
                </View>

                <View className='flex-row justify-end'>
                    <TouchableOpacity className='bg-[#006B5B] w-fit px-6 py-2.5 rounded-3xl' onPress={() => router.replace('/(tabs)' as Href)}>
                        <RegularText className='text-white'>Done</RegularText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    )
}

export default SignupCompletion;
