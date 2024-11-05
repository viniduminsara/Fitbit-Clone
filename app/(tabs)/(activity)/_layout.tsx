import {Stack} from "expo-router";

const ActivityLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }}>
            <Stack.Screen name="activity"/>
        </Stack>
    )
}

export default ActivityLayout
