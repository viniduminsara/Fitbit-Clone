import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Modal, Platform, ScrollView} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import {ALERT_TYPE, Dialog, Toast} from "react-native-alert-notification";
import {logActivityValidation} from "@/util/validation";
import {STEP_LENGTH_METERS} from "@/constants/config";
import {getMetricsData, saveActivity} from "@/service/metricsService";
import {useAppContext} from "@/context/AppContext";
import Spinner from "react-native-loading-spinner-overlay";
import {Href, useRouter} from "expo-router";

export type ActivityFormData = {
    activity: string;
    date: Date;
    startTime: string;
    distance: number;
    calories: number;
};

const LogExerciseScreen = () => {
    const [formData, setFormData] = useState<ActivityFormData>({
        activity: "",
        date: new Date(),
        startTime: "",
        distance: 0,
        calories: 0
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isDate, setIsDate] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();
    const {userData, updateUserMetricsData} = useAppContext();

    const handleChange = (key: keyof ActivityFormData, value: any) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const activityOptions = [
        { key: '0', value: 'Walk' },
        { key: '1', value: 'Run' },
        { key: '2', value: 'Cycle' },
        { key: '3', value: 'Swim' },
    ];

    const showDatePickerHandler = () => {
        setIsDate(true);
        setShowDatePicker(true);
    };

    const showTimePickerHandler = () => {
        setIsDate(false);
        setShowTimePicker(true);
    };

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        setShowDatePicker(false);
        setShowTimePicker(false);
        if (selectedDate) {
            if (isDate) {
                handleChange("date", selectedDate);
            } else {
                handleChange("startTime", `${selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: 'h24', hour12: false })}`);
            }
        }
    };

    const handleSubmit = () => {
        try {
            if (logActivityValidation(formData)){
                setLoading(true);
                const totalSteps = Math.round((formData.distance  * 1000) / STEP_LENGTH_METERS);

                if (userData?.uid){
                    saveActivity(userData?.uid, {
                        activityType: formData.activity,
                        date: formData.date,
                        startTime: formData.startTime,
                        activitySteps: totalSteps,
                        activityDistance: (formData.distance * 1000),
                        activityCaloriesBurned: formData.calories
                    })
                        .then(() => {
                            getMetricsData(userData?.uid)
                                .then((res: any) => {
                                    updateUserMetricsData(res.data);
                                    setLoading(false);
                                    router.replace('/(activity)/activity' as Href);
                                    Dialog.show({
                                        type: ALERT_TYPE.SUCCESS,
                                        title: 'Success',
                                        textBody: 'Activity save successful!',
                                        button: 'close',
                                    });
                                })
                                .catch((err) => {
                                    setLoading(false);
                                    Dialog.show({
                                        type: ALERT_TYPE.DANGER,
                                        title: 'Danger',
                                        textBody: 'Activity save unsuccessful!',
                                        button: 'close',
                                    })
                                })
                        })
                        .catch((err) => {
                            setLoading(false);
                            Dialog.show({
                                type: ALERT_TYPE.DANGER,
                                title: 'Danger',
                                textBody: 'Activity save unsuccessful!',
                                button: 'close',
                            })
                        })
                }
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
        <ScrollView className="flex-1 p-4 bg-gray-100">
            <Spinner visible={isLoading} color='#08B9AF'/>
            <SemiBoldText className="text-xl font-semibold mb-4">Log Exercise</SemiBoldText>

            {/* Activity Dropdown */}
            <MediumText className="text-sm font-medium mb-1">Activity*</MediumText>
            <SelectList
                setSelected={(value: string) => handleChange("activity", activityOptions[parseInt(value)].value)}
                data={activityOptions}
                placeholder="Select Activity"
                boxStyles={{ borderColor: "gray", borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 }}
                dropdownStyles={{ borderColor: "gray", borderRadius: 8 }}
                inputStyles={{ fontFamily: 'Assistant_400Regular'}}
            />

            {/* Date Picker */}
            <MediumText className="text-sm font-medium mb-1">Date*</MediumText>
            <TouchableOpacity
                className="flex-row items-center border border-gray-300 p-3 rounded mb-4"
                onPress={showDatePickerHandler}
            >
                <RegularText>{formData.date.toDateString()}</RegularText>
            </TouchableOpacity>
            {showDatePicker && (
                <DateTimePicker
                    value={formData.date}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}

            {/* Start Time Picker */}
            <MediumText className="text-sm font-medium mb-1">Start Time*</MediumText>
            <TouchableOpacity
                className="flex-row items-center border border-gray-300 p-3 rounded mb-4"
                onPress={showTimePickerHandler}
            >
                <Text>{formData.startTime}</Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={new Date()}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}

            {/* Distance */}
            <MediumText className="text-sm font-medium mb-1">Distance - kilometers*</MediumText>
            <TextInput
                className="border border-gray-300 p-3 rounded mb-4"
                placeholder="Enter distance"
                value={formData.distance.toString()}
                onChangeText={(value) => handleChange("distance", value)}
                keyboardType="numeric"
                style={{ fontFamily: 'Assistant_400Regular'}}
            />

            {/* Energy Burned */}
            <MediumText className="text-sm font-medium mb-1">Energy burned - calories</MediumText>
            <TextInput
                className="border border-gray-300 p-3 rounded mb-4"
                placeholder="Enter estimated calories burned"
                value={formData.calories.toString()}
                onChangeText={(value) => handleChange("calories", value)}
                keyboardType="numeric"
                style={{ fontFamily: 'Assistant_400Regular'}}
            />

            {/* Save Button */}
            <TouchableOpacity className="bg-[#018673] py-3 rounded-full mt-4" onPress={handleSubmit}>
                <RegularText className="text-center text-white font-semibold">Save</RegularText>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default LogExerciseScreen;
