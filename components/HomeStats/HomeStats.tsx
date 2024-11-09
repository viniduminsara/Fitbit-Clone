import { View, Image, ImageSourcePropType } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import {BoldText, LightText} from "@/components/StyledText";

interface IHomeStatsProps {
    title: string;
    value: number;
    goalValue: number;
    image: ImageSourcePropType;
    isSecondary: boolean;
    isDistance: boolean;
}

const HomeStats = ({ title, image, value, goalValue, isSecondary, isDistance }: IHomeStatsProps) => {
    const fillPercentage = (value / goalValue) * 100;

    // Format value based on distance or comma requirement
    const formattedValue = isDistance
        ? value >= 1000
            ? (value / 1000).toFixed(2)
            : value.toFixed(2)
        : value >= 1000
            ? value.toLocaleString()
            : value.toString();

    return (
        <View className='flex justify-center items-center'>
            <AnimatedCircularProgress
                size={isSecondary ? 90 : 160}
                width={isSecondary ? 10 : 12}
                fill={fillPercentage}
                tintColor='#018673'
                backgroundColor='#C7E0DA'
                lineCap='round'
                arcSweepAngle={280}
                rotation={220}
            >
                {() => (
                    <Image source={image} className={`${isSecondary ? 'w-8 h-8' :'w-12 h-12'} object-cover object-center`} />
                )}
            </AnimatedCircularProgress>
            <BoldText className={`${isSecondary ? 'text-2xl' : 'text-5xl'}`}>{formattedValue}</BoldText>
            <LightText className={`${isSecondary ? 'text-lg' : 'text-xl'}`}>{title}</LightText>
        </View>
    );
}

export default HomeStats;
