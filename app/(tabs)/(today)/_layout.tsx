import {Stack} from "expo-router";

const TodayLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
            <Stack.Screen name="index"/>
        </Stack>
    )
}

export default TodayLayout
