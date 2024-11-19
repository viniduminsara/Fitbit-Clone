import {ActivityFormData} from "@/app/(tabs)/(activity)/add";

export const ProfileInfoFormValidation = (height: string, weight: string, gender: string) => {
    if (!height) {
        throw new Error("Height is required.");
    }
    if (isNaN(Number(height))) {
        throw new Error("Height should be a number.");
    }
    if (!weight) {
        throw new Error("Weight is required.");
    }
    if (isNaN(Number(weight))) {
        throw new Error("Weight should be a number.");
    }
    if (!gender) {
        throw new Error("Please select your gender.");
    }

    return true;
};

export const logActivityValidation = (formData: ActivityFormData) => {
    if (!formData.activity) {
        throw new Error("Please select activity.");
    }
    if (!formData.startTime) {
        throw new Error("Please select start time.");
    }
    if (!formData.distance) {
        throw new Error("Distance is required.");
    }
    if (isNaN(Number(formData.distance))) {
        throw new Error("Distance should be a number.");
    }
    if (!formData.calories) {
        throw new Error("Energy Burned is required.");
    }
    if (isNaN(Number(formData.calories))) {
        throw new Error("Energy Burned should be a number.");
    }

    return true;
};
