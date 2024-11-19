import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import React, {useState} from "react";
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import {useAppContext} from "@/context/AppContext";
import {ProfileInfoFormValidation} from "@/util/validation";
import {updateUser} from "@/service/userService";
import {Href, useRouter} from "expo-router";
import {ALERT_TYPE, Dialog, Toast} from "react-native-alert-notification";
import Spinner from "react-native-loading-spinner-overlay";

const EditProfileInfoScreen = () => {
    const {userData, updateUserData} = useAppContext();
    const [height, setHeight] = useState(String(userData?.height || ''));
    const [weight, setWeight] = useState(String(userData?.weight || ''));
    const [gender, setGender] = useState('');
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();

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

                    router.replace('/profile' as Href);
                    Toast.show({
                        type: ALERT_TYPE.SUCCESS,
                        title: 'Warning',
                        textBody: 'Profile information update successful',
                        autoClose: 2000,
                    });
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
        <View className='w-full h-full px-4'>
            <Spinner visible={isLoading} color='#08B9AF'/>
            <View className='flex-row justify-between pr-4 mt-2 mb-4'>
                <SemiBoldText className='text-xl'>Profile Information</SemiBoldText>
                <TouchableOpacity onPress={handleSubmit}>
                    <RegularText className='text-lg text-tintGreen'>Save</RegularText>
                </TouchableOpacity>
            </View>
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
                    />
                    <TextInput
                        value={weight}
                        onChangeText={setWeight}
                        placeholder="Weight"
                        keyboardType="numeric"
                        className="border border-[#E0E0E0] rounded p-2 flex-1 bg-white"
                    />
                </View>

                <View className="border border-[#E0E0E0] rounded bg-white">
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={{height: 50}}
                    >
                        <Picker.Item label="Sex" value=""/>
                        <Picker.Item label="Male" value="male"/>
                        <Picker.Item label="Female" value="female"/>
                    </Picker>
                </View>

                <LightText className="text-xs text-grayText mt-2">
                    Fitbit uses sex to calculate metrics like calories burned, and to provide reference points
                    you can use for comparison.
                </LightText>
            </View>
        </View>
    )
}

export default EditProfileInfoScreen;
