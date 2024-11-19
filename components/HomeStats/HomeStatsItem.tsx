import {Image, ImageSourcePropType, TouchableOpacity, View} from "react-native";
import {LightText, MediumText, SemiBoldText} from "@/components/StyledText";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {useRouter} from "expo-router";

interface IHomeStatsItemProps {
    title: string;
    value: number;
    goalValue: number | undefined;
    image: ImageSourcePropType;
    isDistance: boolean;
}

const HomeStatsItem = ({ title, image, value, goalValue, isDistance} : IHomeStatsItemProps) => {
    const router = useRouter();
    const fillPercentage = goalValue ? (value / goalValue) * 100 : 0;

    const formattedValue = isDistance
        ? value >= 1000
            ? (value / 1000).toFixed(2)
            : value
        : value >= 1000
            ? value.toLocaleString()
            : value.toString();

    return (
        <TouchableOpacity className='bg-white py-4 px-4 rounded-2xl' onPress={() => router.push({pathname: `/details/${title}`, params: {value: value}})}>
            <MediumText>{title}</MediumText>
            <View className='flex-row justify-between items-end'>
                <View>
                    <SemiBoldText className='text-3xl'>{formattedValue} {isDistance ? 'km' : ''}</SemiBoldText>
                    <LightText>Today</LightText>
                </View>
                <AnimatedCircularProgress
                    size={70}
                    width={7}
                    fill={fillPercentage}
                    tintColor='#018673'
                    backgroundColor='#C7E0DA'
                    lineCap='round'
                    arcSweepAngle={280}
                    rotation={220}
                >
                    {() => (
                        <Image source={image} className={'w-6 h-6 object-cover object-center'} />
                    )}
                </AnimatedCircularProgress>
            </View>
        </TouchableOpacity>
    )
}

export default HomeStatsItem;
