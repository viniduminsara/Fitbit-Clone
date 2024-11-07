import {View} from "react-native";
import {LightText, RegularText, SemiBoldText} from "@/components/StyledText";

interface IProfileItemProps {
    title: string;
    value: string;
}

const ProfileItem = ({ title, value }: IProfileItemProps) => {

    return (
        <View className='w-full h-20 bg-white p-4 mb-2 rounded-2xl'>
            <SemiBoldText className='text-lg'>{title}</SemiBoldText>
            <LightText className='text-lg'>{value}</LightText>
        </View>
    )
}

export default ProfileItem;
