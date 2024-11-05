import ScreenLayout from "@/components/ScreenLayout";
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {Href, useRouter} from "expo-router";

const EmailSigninScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <ScreenLayout bgColor='background'>
            <View className='w-full h-full px-4 flex justify-center items-center'>
                <View className='w-full h-fit flex justify-center items-center px-4 py-6 rounded-xl border border-gray-200 bg-white'>
                    <View className='flex-row justify-center items-center space-x-2'>
                        <Image source={require('../../assets/images/logo_black.png')} className='w-6 h-6'/>
                        <Text className='text-3xl text-secondary'>fitbit</Text>
                    </View>
                    <Text className="text-lg text-center font-light my-6">Sign In</Text>

                    <View className="w-full mb-4">
                        <Text className="text-secondary text-sm mb-2">EMAIL ADDRESS</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Your account email"
                            keyboardType="email-address"
                            className="border-b border-gray-300 py-2 text-gray-800"
                        />
                    </View>

                    <View className="w-full mb-8 relative">
                        <Text className="text-secondary text-sm mb-2">PASSWORD</Text>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Enter your secure password"
                            secureTextEntry={!isPasswordVisible}
                            className="border-b border-gray-300 py-2 text-gray-800"
                        />
                        <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            className="absolute right-0 top-10"
                        >
                            <Ionicons
                                name={isPasswordVisible ? 'eye-off' : 'eye'}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity className="w-full mb-8">
                        <Text className="text-[#CCBB9F]">Forgot your password?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-primary py-2 w-64 rounded-2xl" onPress={() => router.replace('/(auth)/profileInfo' as Href)}>
                        <Text className="text-center text-white">SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    )
}

export default EmailSigninScreen;

