import {Stack} from "expo-router";

const YouLayout = () => {
    return (
        <Stack screenOptions={{ headerShown: false, animation: "ios" }} initialRouteName='you'>
            <Stack.Screen name="you"/>
        </Stack>
    )
}

export default YouLayout
