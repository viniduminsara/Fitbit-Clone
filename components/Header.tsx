import {View, Platform, StatusBar} from "react-native";
import {Feather, MaterialIcons} from "@expo/vector-icons";
import {SemiBoldText} from "@/components/StyledText";

const Header = () => {

    return (
        <View
            className='flex flex-row justify-between items-center py-3 px-4'
            style={{ marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0}}
        >
            <MaterialIcons name="devices-other" size={24} color="black" />
            <SemiBoldText className='text-3xl'>fitbit</SemiBoldText>
            <Feather name="message-square" size={24} color="black" />
        </View>
    )
}

export default Header;
