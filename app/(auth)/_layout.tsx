import {Stack} from "expo-router";

const AuthLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
            <Stack.Screen name="welcome"/>
            <Stack.Screen name="emailSignin"/>
            <Stack.Screen name="profileInfo"/>
            <Stack.Screen name="signupCompletion"/>
        </Stack>
    )
}

export default AuthLayout
