import React, {ReactNode} from "react";
import { SafeAreaView, StatusBar, Platform } from "react-native";

interface ScreenLayoutProps {
    children: ReactNode;
    bgColor: string;
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, bgColor }) => {
    return (
        <SafeAreaView
            className={`w-full h-full bg-${bgColor}`}
            style={{
                // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            }}
        >
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {children}
        </SafeAreaView>
    );
};

export default ScreenLayout;
