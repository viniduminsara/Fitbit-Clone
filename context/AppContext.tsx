import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {Href, useRouter} from "expo-router";

interface AppContextType {
    logoutUser : () => void;
}

interface AppContextProviderProps {
    children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(auth().currentUser);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.replace('/(tabs)');
        } else {
            router.replace('/(auth)/welcome' as Href);
        }
    }, [user]);

    const logoutUser = () => {
        setUser(null);
    }

    return (
        <AppContext.Provider value={{ logoutUser }}>
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
