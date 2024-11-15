import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ScreenLayout from "@/components/ScreenLayout";
import {Href, useRouter} from "expo-router";
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import {ProfileInfoFormValidation} from "@/util/validation";
import {ALERT_TYPE, Dialog, Toast} from "react-native-alert-notification";
import {updateUser} from "@/service/userService";
import {useAppContext} from "@/context/AppContext";
import Spinner from "react-native-loading-spinner-overlay";

const ProfileInfoScreen = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [gender, setGender] = useState('');
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const {userData, updateUserData} = useAppContext();



    const handleSubmit = () => {
        try {
            if (ProfileInfoFormValidation(height, weight, gender)){
                setLoading(true);
                updateUser(userData?.uid, {
                    height: parseInt(height),
                    weight: parseInt(weight),
                    gender: gender
                }).then((res: any) => {
                    const userData = res.data;
                    updateUserData(userData);

                    setLoading(false);
                    router.replace('/(auth)/signupCompletion' as Href);
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
        } catch (error: any) {
            Toast.show({
                type: ALERT_TYPE.WARNING,
                title: 'Warning',
                textBody: error.message,
                autoClose: 2000,
            });
        }
    }

    return (
        <ScreenLayout bgColor='background'>
            <Spinner visible={isLoading} color='#08B9AF'/>
            <View className='w-full h-full flex justify-between mt-4 py-10 px-4'>
                <View>
                    <View className="flex justify-start items-start mb-6">
                        <Image source={require('../../assets/images/info_icon.png')} className='w-10 h-10'/>
                    </View>

                    <View>
                        <SemiBoldText className="text-3xl mb-2">Add Fitbit profile info</SemiBoldText>
                        <LightText className="text-sm text-[#757575] mb-8">
                            Fitbit uses this information to calculate some metrics like stride length and speed. To choose
                            who sees this, go to Fitbit settings {'>'} Social & Sharing {'>'} Privacy. Information in your
                            profile is private by default.
                        </LightText>

                        <View className="mb-5">
                            <MediumText className="mb-2 text-grayText">Your profile info</MediumText>

                            <View className="flex-row justify-between mb-4">
                                <TextInput
                                    value={height}
                                    onChangeText={setHeight}
                                    placeholder="Height"
                                    keyboardType="numeric"
                                    className="border border-[#E0E0E0] rounded p-2 flex-1 mr-2 bg-white"
                                    style={{fontFamily: 'Assistant_400Regular'}}
                                />
                                <TextInput
                                    value={weight}
                                    onChangeText={setWeight}
                                    placeholder="Weight"
                                    keyboardType="numeric"
                                    className="border border-[#E0E0E0] rounded p-2 flex-1 bg-white"
                                    style={{fontFamily: 'Assistant_400Regular'}}
                                />
                            </View>

                            <View className="border border-[#E0E0E0] rounded bg-white">
                                <Picker
                                    selectedValue={gender}
                                    onValueChange={(itemValue) => setGender(itemValue)}
                                    style={{height: 50, fontFamily: 'Assistant_400Regular'}}
                                >
                                    <Picker.Item label="Gender" value=""/>
                                    <Picker.Item label="Male" value="Male"/>
                                    <Picker.Item label="Female" value="Female"/>
                                </Picker>
                            </View>

                            <RegularText className="text-xs text-grayText mt-2">
                                Fitbit uses sex to calculate metrics like calories burned, and to provide reference points
                                you can use for comparison.
                            </RegularText>
                        </View>
                    </View>
                </View>

                <View className="flex-row justify-between items-center pl-4">
                    <TouchableOpacity>
                        <RegularText className="text-[#2E7D32] text-sm">Exit</RegularText>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-primary p-3 rounded-full" onPress={handleSubmit}>
                        <RegularText className="text-white text-sm">Save & continue</RegularText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    );
};

export default ProfileInfoScreen;
