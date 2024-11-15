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
