import {Image, SafeAreaView, View} from "react-native";
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import {useLocalSearchParams} from "expo-router";
import BarChart from "@/components/weeklyBarChart/BarChart";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {useAppContext} from "@/context/AppContext";

const DetailsScreen = () => {
    const { name, value } = useLocalSearchParams();
    const {userData, userMetricsData} = useAppContext();
    const data: [{ value: number, label: string }] = [];

    userMetricsData?.map((metric) => {
        if (name.toLocaleString().toLowerCase() === 'energy burned'){
            data.push({
                label: metric.date.toString().slice(5,10),
                value: metric['caloriesBurned']
            })
        } else {
            data.push({
                label: metric.date.toString().slice(5,10),
                value: metric[name.toLocaleString().toLowerCase()]
            })
        }
    })

    const goalValue = name.toLocaleString().toLowerCase() === 'energy burned' ? userData?.goals?.energyBurned : userData?.goals[name.toLocaleString().toLowerCase()];
    const currentValue =  parseFloat(value);
    const fillPercentage = goalValue ? (currentValue / goalValue) * 100 : 0;

    return (
        <SafeAreaView className='px-6'>
            <View className='flex-row justify-between mt-12'>
                <View>
                    <View className='flex-row items-center'>
                        <SemiBoldText className='text-5xl mr-1'>{value}</SemiBoldText>
                        <RegularText className='text-lg'>
                            of {goalValue} {name.toLocaleString().toLowerCase()}</RegularText>
                    </View>
                    {goalValue > currentValue ?
                        <LightText className='text-lg'>You're {(goalValue - currentValue)} away from hitting</LightText>

                        :

                        <LightText className='text-lg'>You've passed with {(currentValue - goalValue)} from</LightText>
                    }
                    <LightText className='text-lg'>your daily goal</LightText>
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
                        <Image source={require('../../../../assets/images/home/shoe.png')} className={'w-6 h-6 object-cover object-center'} />
                    )}
                </AnimatedCircularProgress>
            </View>
            <BarChart data={data.reverse()}/>
        </SafeAreaView>
    )
}

export default DetailsScreen;
