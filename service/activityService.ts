import {post} from "@/service/apiService";

export const saveManualActivity = async (uid: string, data: any) => {
    return await post(`/activity/${uid}/manual`, data);
}

export const saveTrackingActivity = async (uid: string, data: any) => {
    return await post(`/activity/${uid}/tracking`, data);
}
