import {Stack} from "expo-router";

const ActivityLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }} initialRouteName='activity'>
            <Stack.Screen name="activity"/>
            <Stack.Screen name="add"/>
        </Stack>
    )
}

export default ActivityLayout
