import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import "../global.css";

import {useColorScheme} from '@/components/useColorScheme';
import {
    useFonts,
    Assistant_300Light,
    Assistant_400Regular,
    Assistant_500Medium,
    Assistant_600SemiBold,
    Assistant_700Bold
} from '@expo-google-fonts/assistant'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded, error] = useFonts({
        Assistant_300Light,
        Assistant_400Regular,
        Assistant_500Medium,
        Assistant_600SemiBold,
        Assistant_700Bold
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav/>;
}

function RootLayoutNav() {
    const colorScheme = useColorScheme();

    return (
        <Stack screenOptions={{headerShown: false, animation: 'ios'}}>
            <Stack.Screen name="index"/>
            <Stack.Screen name="(tabs)"/>
            <Stack.Screen name="(auth)"/>
        </Stack>
    );
}
