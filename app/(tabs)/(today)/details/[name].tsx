import {Image, SafeAreaView, View} from "react-native";
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import {useLocalSearchParams} from "expo-router";
import BarChart from "@/components/weeklyBarChart/BarChart";
import {AnimatedCircularProgress} from "react-native-circular-progress";
import {useAppContext} from "@/context/AppContext";

const DetailsScreen = () => {
    const { name } = useLocalSearchParams();
    const {userData} = useAppContext();
    const data = [
        { value: 30, label: '0' },
        { value: 0, label: '4 '},
        { value: 100, label: '8' },
        { value: 0, label: '12' },
        { value: 50, label: '14' },
        { value: 80, label: '16' },
        { value: 0, label: '18' },
        { value: 0, label: '20' },
    ];

    return (
        <SafeAreaView className='px-6'>
            <View className='flex-row justify-between mt-12'>
                <View>
                    <View className='flex-row items-center'>
                        <SemiBoldText className='text-5xl mr-1'>0</SemiBoldText>
                        <RegularText className='text-lg'>
                            of {name.toLocaleString().toLowerCase() === 'energy burned' ? userData?.goals?.energyBurned : userData?.goals[name.toLocaleString().toLowerCase()]} {name.toLocaleString().toLowerCase()}</RegularText>
                    </View>
                    <LightText className='text-lg'>You're {((name.toLocaleString().toLowerCase() === 'energy burned' ? userData?.goals?.energyBurned : userData?.goals[name.toLocaleString().toLowerCase()]) - 1224)} steps away from hitting</LightText>
                    <LightText className='text-lg'>your daily goal</LightText>
                </View>
                <AnimatedCircularProgress
                    size={70}
                    width={7}
                    fill={63}
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
            <BarChart data={data}/>
        </SafeAreaView>
    )
}

export default DetailsScreen;
