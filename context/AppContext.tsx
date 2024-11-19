import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {Href, useRouter} from "expo-router";
import {getUserByUid} from "@/service/userService";
import {handleConnectionError} from "@/util/errors";
import axios from "axios";

interface AppContextType {
    userData: User | null;
    userMetricsData: IMetrics[] | null;
    updateUserData: (userData: User) => void;
    updateUserMetricsData: (metricsData: IMetrics[]) => void;
    logoutUser : () => void;
}

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser);
    const [userData, setUserData] = useState<User | null>(null);
    const [userMetricsData, setUserMetricsData] = useState<IMetrics[] | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            getUserByUid(user.uid)
                .then((res: any) => {
                    const userData = res.data;
                    setUserData(userData);
                    router.replace('/(tabs)' as Href);
                })
                .catch((error) => {
                    if (axios.isAxiosError(error)) {
                        const response = error?.response

                        if (error.code === 'ERR_NETWORK' || error.code === 'ERR_CANCELED') {
                            handleConnectionError();
                        }

                        if (response) {
                            const statusCode = response?.status
                            if (statusCode === 404) {
                                auth().signOut()
                                    .then(() => router.replace('/(auth)/welcome' as Href))
                                    .catch(() => handleConnectionError)
                            }
                        }
                    } else {
                        handleConnectionError();
                    }
                })
        } else {
            router.replace('/(auth)/welcome' as Href);
        }
    }, [user]);

    const updateUserData = (userData: User) => {
        setUserData(userData);
    }

    const updateUserMetricsData = (metricsData: IMetrics[]) => {
        setUserMetricsData(metricsData);
    }

    const logoutUser = () => {
        setUser(null);
    }

    return (
        <AppContext.Provider value={{ userData, userMetricsData, updateUserData, updateUserMetricsData, logoutUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppContextProvider');
    }

    return context;
}
