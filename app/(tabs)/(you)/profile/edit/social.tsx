import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { LightText, MediumText, RegularText, SemiBoldText } from "@/components/StyledText";
import {Href, useRouter} from "expo-router";
import {useAppContext} from "@/context/AppContext";
import {ALERT_TYPE, Dialog, Toast} from "react-native-alert-notification";
import {updateUser} from "@/service/userService";
import Spinner from "react-native-loading-spinner-overlay";
import * as commonFunc from "../../../../../util/commonfunc";

const EditSocialProfileScreen = () => {
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const {userData, updateUserData} = useAppContext();
    const [formData, setFormData] = useState({
        displayName: userData?.displayName || '',
    });

    const handleChange = (key: any, value: any) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    const handleSubmit = () => {
        if (formData.displayName){
            setLoading(true);
            updateUser(userData?.uid, {
                displayName: formData.displayName
            }).then((res: any) => {
                const userData = res.data.body;
                updateUserData(userData);

                setLoading(false);
                router.replace('/profile' as Href);
                commonFunc.showToast(ALERT_TYPE.SUCCESS, "Success", "Profile information update successful");
            }).catch((error) => {
                setLoading(false);
                commonFunc.showToast(ALERT_TYPE.DANGER, "Error", `${error.message}`);
            })
        } else {
            commonFunc.showToast(ALERT_TYPE.WARNING, "Warning", "Please enter display name");
        }
    }

    return (
        <View className="w-full h-full px-4 bg-gray-100">
            <Spinner visible={isLoading} color='#08B9AF'/>
            <View className="flex-row justify-between pr-4">
                <SemiBoldText className="text-2xl font-semibold mb-4">Social profile</SemiBoldText>
                <TouchableOpacity onPress={handleSubmit}>
                    <RegularText className="text-lg text-tintGreen">Save</RegularText>
                </TouchableOpacity>
            </View>
            <LightText className="text-gray-600 mb-6">
                Social profile information can be visible to your friends and groups.
                You can choose whether or not to share your location with your friends.
            </LightText>

            <MediumText className="text-lg mb-2">Names</MediumText>
            <TextInput
                className="border border-gray-300 p-2 mb-4 rounded"
                placeholder="Display name"
                value={formData.displayName}
                onChangeText={(text) => handleChange('displayName', text)}
            />
            <LightText className="text-gray-500 text-sm mb-4">
                To change your name, edit it in Google Account {'>'} Personal info
            </LightText>

        </View>
    );
};

export default EditSocialProfileScreen;
