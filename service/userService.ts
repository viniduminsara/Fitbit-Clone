import {get, post, patch} from "@/service/apiService";

export const saveUserWithoutDetails = async (uid: string, email: string | null, displayName: string | null) => {
    const user: User = {
        uid: uid,
        email: email,
        displayName: displayName,
        gender: 'Male',
        weight: 60,
        height: 160,
        goals: {
            exerciseDays: 5,
            steps: 5000,
            distance: 3,
            energyBurned: 2500,
            weight: 70,
            bodyFat: 10,
        }
    }
    return await post('/users', user);
}

export const getUserByUid = async (uid: string) => {
    return await get(`/users/${uid}`);
}

export const updateUser = async (uid: string | undefined, data: any) => {
    return await patch(`/users/${uid}`, data);
}

export const updateUserGoals = async (uid: string | undefined, data: any) => {
    return await patch(`/users/${uid}/goals`, data);
}
