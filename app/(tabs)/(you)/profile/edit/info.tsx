import {Text, TextInput, TouchableOpacity, View} from "react-native";
import {Picker} from "@react-native-picker/picker";
import React, {useState} from "react";
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";

const EditProfileInfoScreen = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');

    return (
        <View className='w-full h-full px-4'>
            <View className='flex-row justify-between pr-4 mt-2 mb-4'>
                <SemiBoldText className='text-xl'>Profile Information</SemiBoldText>
                <TouchableOpacity>
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
                        selectedValue={sex}
                        onValueChange={(itemValue) => setSex(itemValue)}
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
