import { View, Platform, StatusBar, Image } from "react-native";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import {BoldText, SemiBoldText} from "@/components/StyledText";
import auth from "@react-native-firebase/auth";
import React from "react";

const Header = () => {
    const user = auth().currentUser;

    return (
        <View
            className='flex flex-row justify-between items-center py-3 px-4'
            style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }}
        >
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <MaterialIcons name="devices-other" size={24} color="black" />
            <SemiBoldText className='text-3xl'>fitbit</SemiBoldText>
            <View>
                {user?.photoURL ? (
                    <Image
                        source={{ uri: user.photoURL }}
                        className='w-10 h-10 rounded-full'
                    />
                ) : (
                    <View className='w-10 h-10 rounded-full bg-primary flex justify-center items-center'>
                        <BoldText className='text-white text-2xl'>{user?.displayName?.slice(0, 1).toUpperCase()}</BoldText>
                    </View>
                )}
            </View>
        </View>
    );
};

export default Header;
