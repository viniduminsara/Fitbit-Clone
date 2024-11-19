import ScreenLayout from "@/components/ScreenLayout";
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {Href, useRouter} from "expo-router";
import auth from "@react-native-firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import {handleAuthError} from "@/util/errors";
import {MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import Spinner from "react-native-loading-spinner-overlay";
import {getUserByUid, saveUserWithoutDetails} from "@/service/userService";
import {useAppContext} from "@/context/AppContext";

const EmailSigninScreen = () => {
    const [formState, setFormState] = useState({
        email: '',
        displayName: '',
        password: '',
        isPasswordVisible: false,
    });
    const [isSignIn, setIsSignIn] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const {updateUserData} = useAppContext();

    const handleInputChange = (name: string, value: string) => {
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const togglePasswordVisibility = () => {
        setFormState((prevState) => ({
            ...prevState,
            isPasswordVisible: !prevState.isPasswordVisible,
        }));
    };

    const toggleAuthMode = () => {
        setIsSignIn((prev) => !prev);
    };

    const handleSubmit = () => {
        if (formState.email !== '' && formState.password) {
            setLoading(true);
            if (isSignIn) {
                auth()
                    .signInWithEmailAndPassword(formState.email, formState.password)
                    .then((userCredential) => {
                        getUserByUid(userCredential.user.uid)
                            .then((res: any) => {
                                const userData = res.data;
                                updateUserData(userData);

                                setLoading(false);
                                router.replace('/(tabs)' as Href);
                            })
                            .catch((err) => {
                                setLoading(false);
                                if (err.status === 404){
                                    Toast.show({
                                        type: ALERT_TYPE.WARNING,
                                        title: 'Warning',
                                        textBody: 'User not found.',
                                        autoClose: 2000,
                                    });
                                }
                            })
                    })
                    .catch((error) => {
                        setLoading(false);
                        handleAuthError(error);
                    })
            } else {
                auth()
                    .createUserWithEmailAndPassword(formState.email, formState.password)
                    .then((userCredential) => {
                        userCredential.user.updateProfile({displayName: formState.displayName})
                            .then(() => {
                                saveUserWithoutDetails(
                                    userCredential.user.uid,
                                    userCredential.user.email,
                                    formState.displayName
                                ).then((res: any) => {
                                    const userData = res.data;
                                    updateUserData(userData);

                                    setLoading(false);
                                    router.replace('/profileInfo' as Href);
                                }).catch((error) => {
                                    setLoading(false);
                                    if (error.response.status === 409){
                                        Toast.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: 'Warning',
                                            textBody: 'User already created.',
                                            autoClose: 2000,
                                        });
                                    }
                                })
                            })
                            .catch((error) => {
                                setLoading(false);
                                handleAuthError(error)
                            })
                    })
                    .catch((error) => {
                        setLoading(false);
                        handleAuthError(error);
                    });
            }
        } else {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: 'Please enter valid data',
                autoClose: 2000,
            });
        }
    };

    return (
        <ScreenLayout bgColor="background">
            <Spinner visible={isLoading} color='#08B9AF'/>
            <View className="w-full h-full px-4 flex justify-center items-center">
                <View className="w-full h-fit flex justify-center items-center px-4 py-6 rounded-xl border border-gray-200 bg-white">
                    <View className="flex-row justify-center items-center space-x-2">
                        <Image source={require('../../assets/images/logo_black.png')} className="w-6 h-6" />
                        <SemiBoldText className="text-3xl text-secondary">fitbit</SemiBoldText>
                    </View>
                    <SemiBoldText className="text-xl text-center font-light my-6">{isSignIn ? 'Sign In' : 'Sign Up'}</SemiBoldText>

                    <View className="w-full mb-4">
                        <MediumText className="text-secondary text-sm mb-2">EMAIL ADDRESS</MediumText>
                        <TextInput
                            value={formState.email}
                            onChangeText={(value) => handleInputChange('email', value)}
                            placeholder="Your account email"
                            keyboardType="email-address"
                            className="border-b border-gray-300 py-2 text-gray-800"
                            style={{fontFamily: 'Assistant_400Regular'}}
                        />
                    </View>

                    {!isSignIn && (
                        <View className="w-full mb-4">
                            <MediumText className="text-secondary text-sm mb-2">DISPLAY NAME</MediumText>
                            <TextInput
                                value={formState.displayName}
                                onChangeText={(value) => handleInputChange('displayName', value)}
                                placeholder="Your account display name"
                                keyboardType="email-address"
                                className="border-b border-gray-300 py-2 text-gray-800"
                                style={{fontFamily: 'Assistant_400Regular'}}
                            />
                        </View>
                    )}

                    <View className="w-full mb-8 relative">
                        <MediumText className="text-secondary text-sm mb-2">PASSWORD</MediumText>
                        <TextInput
                            value={formState.password}
                            onChangeText={(value) => handleInputChange('password', value)}
                            placeholder="Enter your secure password"
                            secureTextEntry={!formState.isPasswordVisible}
                            className="border-b border-gray-300 py-2 text-gray-800"
                            style={{fontFamily: 'Assistant_400Regular'}}
                        />
                        <TouchableOpacity
                            onPress={togglePasswordVisibility}
                            className="absolute right-0 top-10"
                        >
                            <Ionicons
                                name={formState.isPasswordVisible ? 'eye-off' : 'eye'}
                                size={24}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity className="w-full mb-8">
                        <RegularText className="text-[#CCBB9F]">Forgot your password?</RegularText>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-primary py-2 w-64 rounded-2xl" onPress={handleSubmit}>
                        <Text className="text-center text-white">{isSignIn ? 'SIGN IN' : 'SIGN UP'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleAuthMode} className="mt-4">
                        <MediumText className="text-[#CCBB9F] text-lg">
                            {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                        </MediumText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    );
};

export default EmailSigninScreen;
