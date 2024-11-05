import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ScreenLayout from "@/components/ScreenLayout";
import {Href, useRouter} from "expo-router";

const ProfileInfoScreen = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');
    const router = useRouter();

    return (
        <ScreenLayout bgColor='background'>
            <View className='w-full h-full flex justify-between py-6 px-4'>
                <View>
                    <View className="flex justify-start items-start mb-6">
                        <Image source={require('../../assets/images/info_icon.png')} className='w-10 h-10'/>
                    </View>

                    <View>
                        <Text className="text-2xl font-bold mb-2">Add Fitbit profile info</Text>
                        <Text className="text-sm text-[#757575] mb-8">
                            Fitbit uses this information to calculate some metrics like stride length and speed. To choose
                            who sees this, go to Fitbit settings {'>'} Social & Sharing {'>'} Privacy. Information in your
                            profile is private by default.
                        </Text>

                        <View className="mb-5">
                            <Text className="mb-2 text-grayText">Your profile info</Text>

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

                            <Text className="text-xs text-grayText mt-2">
                                Fitbit uses sex to calculate metrics like calories burned, and to provide reference points
                                you can use for comparison.
                            </Text>
                        </View>
                    </View>
                </View>

                <View className="flex-row justify-between items-center pl-4">
                    <TouchableOpacity>
                        <Text className="text-[#2E7D32] text-sm">Exit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="bg-primary p-3 rounded-full" onPress={() => router.push('(auth)/signupCompletion' as Href)}>
                        <Text className="text-white text-sm">Save & continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScreenLayout>
    );
};

export default ProfileInfoScreen;
