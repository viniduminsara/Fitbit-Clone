import {TouchableOpacity, View} from "react-native";
import {MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import {useRouter} from "expo-router";

interface IGoalItemProps {
    title: string;
    value: number;
    isDaily: boolean;
    isDistance: boolean;
    path: string;
}

const GoalItem = ({title, value, isDaily, isDistance, path}: IGoalItemProps) => {
    const router = useRouter();

    const formattedValue = isDistance
        ? value >= 1000
            ? (value / 1000).toFixed(2)
            : value
        : value >= 1000
            ? value.toLocaleString()
            : value.toString();

    return (
        <TouchableOpacity
            onPress={() => router.push(`goal/edit/${path}`)}
            className='flex-row justify-between items-center bg-white rounded-2xl p-4 mb-2'
        >
            <SemiBoldText className='text-lg'>{title}</SemiBoldText>
            <View className='flex items-end'>
                <MediumText className='text-4xl align-baseline'>{formattedValue} {isDistance ? 'km' : ''}</MediumText>
                <RegularText className='text-grayText'>{isDaily ? 'Daily' : 'Weekly'}</RegularText>
            </View>
        </TouchableOpacity>
    )
}

export default GoalItem;
