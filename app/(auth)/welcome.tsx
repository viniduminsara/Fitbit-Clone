import {Image, TouchableOpacity, View} from "react-native";
import {Href, useRouter} from "expo-router";
import ScreenLayout from "@/components/ScreenLayout";
import React, {useState} from "react";
import {MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Spinner from "react-native-loading-spinner-overlay";
import {getUserByUid, saveUserWithoutDetails} from "@/service/userService";
import {useAppContext} from "@/context/AppContext";
import {handleConnectionError} from "@/util/errors";

const WelcomeScreen = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const {updateUserData} = useAppContext();

    GoogleSignin.configure({
        webClientId: '963994442676-1f9hod5bf504vpgval9u2ktc646slbpo.apps.googleusercontent.com',
    });

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await GoogleSignin.signOut();

            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            const { idToken } = await GoogleSignin.signIn();

            if (!idToken) {
                console.log('Sign-in was canceled or failed to retrieve idToken');
                return;
            }

            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            auth().signInWithCredential(googleCredential)
                .then((userCredential) => {
                     getUserByUid(userCredential.user.uid)
                         .then((res:any) => {
                             const userData = res.data;
                             updateUserData(userData);

                             setLoading(false);
                             router.replace('/(tabs)' as Href);
                         })
                         .catch((error) => {
                             saveUserWithoutDetails(
                                 userCredential.user.uid,
                                 userCredential.user.email,
                                 userCredential.user.displayName
                             ).then((res:any) => {
                                 const userData = res.data;
                                 updateUserData(userData);

                                 setLoading(false);
                                 router.replace('/profileInfo' as Href);
                             })
                         })
                })
        } catch (error: any) {
            setLoading(false);
            handleConnectionError();
        }
    }

    return (
        <ScreenLayout bgColor='primary'>
            <Spinner visible={isLoading} color='#08B9AF'/>
            <View className='w-screen h-1/2'>
                <Image source={require('../../assets/images/welcome.jpg')} className='w-full h-full'/>
            </View>
            <View className='flex justify-end items-center w-full h-1/2 px-4'>
                <View className='flex-row justify-center items-center space-x-2'>
                    <Image source={require('../../assets/images/logo_black.png')} className='w-8 h-8'/>
                    <SemiBoldText className='text-4xl text-secondary ml-2'>fitbit</SemiBoldText>
                </View>
                <MediumText className='text-2xl text-center px-4'>Take the next step forward a healthier, more active life</MediumText>
                <View className='w-full mt-10 mb-6'>
                    <TouchableOpacity
                        className='bg-secondary w-full py-3 flex-row justify-center rounded-3xl mb-4'
                        onPress={handleGoogleSignIn}
                    >
                        <RegularText className='text-white'>Sign in with Google</RegularText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='bg-primary w-full py-3 flex-row justify-center rounded-3xl border-2 border-secondary'
                        onPress={() => router.replace('/emailSignin' as Href)}
                    >
                        <RegularText className='text-secondary'>Sign in with Fitbit</RegularText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    )
}

export default WelcomeScreen;
