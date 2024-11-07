import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import { LightText, MediumText, RegularText, SemiBoldText } from "@/components/StyledText";

const countries = [
    'Sri Lanka',
    'India',
    'United States',
    'Australia',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'China',
    'Japan',
    'Brazil',
    'South Africa',
    // Add other countries as needed
];

const EditSocialProfileScreen = () => {
    const [formData, setFormData] = useState({
        displayName: 'Vinidu M',
        username: '',
        useDisplayName: true,
        location: 'Sri Lanka',
    });

    const handleChange = (key: any, value: any) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    return (
        <View className="w-full h-full px-4 bg-gray-100">
            <View className="flex-row justify-between pr-4">
                <SemiBoldText className="text-2xl font-semibold mb-4">Social profile</SemiBoldText>
                <TouchableOpacity>
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
                editable={false} // mimic disabled state
            />
            <LightText className="text-gray-500 text-sm mb-4">
                To change your name, edit it in Google Account {'>'} Personal info
            </LightText>

            <TextInput
                className="border border-gray-300 p-2 mb-4 rounded"
                placeholder="Username"
                value={formData.username}
                onChangeText={(text) => handleChange('username', text)}
            />
            <LightText className="text-gray-500 text-sm mb-6">
                You can only change your username once every 60 days
            </LightText>

            <MediumText className="text-lg font-medium mb-2">
                Which name do you want to use socially?
            </MediumText>

            <View className="flex-row items-center mb-4">
                <Switch
                    value={formData.useDisplayName}
                    onValueChange={(value) => handleChange('useDisplayName', value)}
                    trackColor={{ false: '#767577', true: '#08B9AF' }}
                    thumbColor={formData.useDisplayName ? '#018673' : '#f4f3f4'}
                />
                <Text className="ml-2">{formData.useDisplayName ? 'Display name' : 'Username'}</Text>
            </View>

            <MediumText className="text-lg font-medium mb-2">Social profile location</MediumText>
            <Picker
                selectedValue={formData.location}
                className="border border-gray-300 p-2 mb-4 rounded"
                onValueChange={(itemValue) => handleChange('location', itemValue)}
            >
                {countries.map((country) => (
                    <Picker.Item label={country} value={country} key={country} />
                ))}
            </Picker>
        </View>
    );
};

export default EditSocialProfileScreen;
