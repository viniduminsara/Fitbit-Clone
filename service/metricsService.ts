import {get, patch} from "@/service/apiService";

export const getMetricsData = async (uid: string) => {
    return await get(`/metrics/${uid}`);
}

export const updateMetricsData = async (uid: string, data: any) => {
    return await patch(`/metrics/${uid}`, data);
}
