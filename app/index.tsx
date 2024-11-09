import React from "react";
import {View, ActivityIndicator} from "react-native";
import ScreenLayout from "@/components/ScreenLayout";

const WelcomeScreen = () => {

    return (
        <ScreenLayout bgColor='background'>
            <View className='w-full h-full flex justify-center items-center'>
                <ActivityIndicator size='large'/>
            </View>
        </ScreenLayout>
    )
}

export default WelcomeScreen;
