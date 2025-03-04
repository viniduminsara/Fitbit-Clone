import axios, {AxiosHeaders, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import auth from "@react-native-firebase/auth";

const ApiService = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    timeout: 5000,
});

// Add a request interceptor to include Firebase ID token
ApiService.interceptors.request.use(
    async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
        const currentUser = auth().currentUser;

        if (currentUser) {
            const token = await currentUser.getIdToken();
            if (!config.headers) {
                config.headers = new AxiosHeaders();
            }
            config.headers.set('Authorization', `Bearer ${token}`);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Define a type for query parameters
interface QueryParams {
    [key: string]: any;
}

// Define API method types
export const get = <T>(url: string, params?: QueryParams): Promise<AxiosResponse<T>> =>
    ApiService.get<T>(url, { params });

export const post = <T>(url: string, data?: any): Promise<AxiosResponse<T>> =>
    ApiService.post<T>(url, data);

export const patch = <T>(url: string, data?: any): Promise<AxiosResponse<T>> =>
    ApiService.patch<T>(url, data);


export const del = <T>(url: string): Promise<AxiosResponse<T>> =>
    ApiService.delete<T>(url);

export default ApiService;
