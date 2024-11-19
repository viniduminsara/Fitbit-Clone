import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const ApiService = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
    timeout: 5000,
});

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
