import {get, patch, post} from "@/service/apiService";

export const getMetricsData = async (uid: string) => {
    const date = new Date().toISOString();
    return await get(`/metrics/${uid}?date=${date}`);
}

export const updateMetricsData = async (uid: string, data: any) => {
    return await patch(`/metrics/${uid}`, data);
}
