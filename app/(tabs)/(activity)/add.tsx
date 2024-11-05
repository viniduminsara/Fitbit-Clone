import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Platform } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';

type FormData = {
    activity: string;
    date: Date;
    startTime: Date;
    duration: string;
    distance: string;
    calories: string;
};

const LogExerciseScreen = () => {
    const [formData, setFormData] = useState<FormData>({
        activity: "",
        date: new Date(),
        startTime: new Date(),
        duration: "",
        distance: "",
        calories: ""
    });
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isDate, setIsDate] = useState(true); // To differentiate between date and time picker

    const handleChange = (key: keyof FormData, value: any) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const activityOptions = [
        { key: '1', value: 'Walk' },
        { key: '2', value: 'Run' },
        { key: '3', value: 'Cycle' },
        { key: '4', value: 'Swim' },
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
                // Create a new Date object that retains the existing date but updates the time
                const updatedTime = new Date(formData.startTime);
                updatedTime.setHours(selectedDate.getHours());
                updatedTime.setMinutes(selectedDate.getMinutes());
                handleChange("startTime", updatedTime);
            }
        }
    };

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <Text className="text-xl font-semibold mb-4">Log Exercise</Text>

            {/* Activity Dropdown */}
            <Text className="text-sm font-medium mb-1">Activity*</Text>
            <SelectList
                setSelected={(value: string) => handleChange("activity", value)}
                data={activityOptions}
                placeholder="Select Activity"
                boxStyles={{ borderColor: "gray", borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 }}
                dropdownStyles={{ borderColor: "gray", borderRadius: 8 }}
            />

            {/* Date Picker */}
            <Text className="text-sm font-medium mb-1">Date*</Text>
            <TouchableOpacity
                className="flex-row items-center border border-gray-300 p-3 rounded mb-4"
                onPress={showDatePickerHandler}
            >
                <Text>{formData.date.toDateString()}</Text>
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
            <Text className="text-sm font-medium mb-1">Start Time*</Text>
            <TouchableOpacity
                className="flex-row items-center border border-gray-300 p-3 rounded mb-4"
                onPress={showTimePickerHandler}
            >
                <Text>{formData.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Text>
            </TouchableOpacity>
            {showTimePicker && (
                <DateTimePicker
                    value={formData.startTime}
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={handleDateChange}
                />
            )}

            {/* Duration */}
            <Text className="text-sm font-medium mb-1">Duration - min*</Text>
            <TextInput
                className="border border-gray-300 p-3 rounded mb-4"
                placeholder="30"
                value={formData.duration}
                onChangeText={(value) => handleChange("duration", value)}
                keyboardType="numeric"
            />

            {/* Distance */}
            <Text className="text-sm font-medium mb-1">Distance - kilometers*</Text>
            <TextInput
                className="border border-gray-300 p-3 rounded mb-4"
                placeholder="Enter distance"
                value={formData.distance}
                onChangeText={(value) => handleChange("distance", value)}
                keyboardType="numeric"
            />

            {/* Energy Burned */}
            <Text className="text-sm font-medium mb-1">Energy burned - calories</Text>
            <TextInput
                className="border border-gray-300 p-3 rounded mb-4"
                placeholder="Fitbit will auto-calculate if left empty"
                value={formData.calories}
                onChangeText={(value) => handleChange("calories", value)}
                keyboardType="numeric"
            />

            {/* Save Button */}
            <TouchableOpacity className="bg-green-500 p-3 rounded mt-4" onPress={() => console.log(formData)}>
                <Text className="text-center text-white font-semibold">Save</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LogExerciseScreen;
