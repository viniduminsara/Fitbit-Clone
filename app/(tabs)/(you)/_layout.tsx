import {Stack} from "expo-router";

const YouLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }} initialRouteName='you'>
            <Stack.Screen name="you"/>
            <Stack.Screen name="profile/index"/>
            <Stack.Screen name="profile/edit/info"/>
            <Stack.Screen name="profile/edit/social"/>
        </Stack>
    )
}

export default YouLayout
