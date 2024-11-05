import {View, ScrollView} from 'react-native';
import HomeStats from "@/components/HomeStats/HomeStats";
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import HomeStatsItem from "@/components/HomeStats/HomeStatsItem";

const HomeScreen = () => {

    return (
        <ScrollView className='w-full h-full px-4'>
            <View className='items-center mt-4 mb-6'>
                <SemiBoldText className='text-xl'>Today</SemiBoldText>
            </View>
            <View className='flex justify-center items-center mb-4'>
                <HomeStats
                    title='Steps'
                    value={2857}
                    goalValue={5000}
                    image={require('../../../assets/images/home/shoe.png')}
                    isSecondary={false}
                    isDistance={false}
                />
            </View>
            <View className='flex-row justify-around items-center'>
                <HomeStats
                    title='km'
                    value={3015}
                    goalValue={8000}
                    image={require('../../../assets/images/home/distance.png')}
                    isSecondary={true}
                    isDistance={true}
                />
                <HomeStats
                    title='cal'
                    value={1966}
                    goalValue={2500}
                    image={require('../../../assets/images/home/calorie.png')}
                    isSecondary={true}
                    isDistance={false}
                />
            </View>

            <View className='mt-4'>
                <RegularText className='text-lg mb-2 pl-2'>Activity</RegularText>
                <View className='mb-3 bg-white p-4 rounded-2xl'>
                    <MediumText className='text-lg mb-2'>Exercise days</MediumText>
                    <View className='flex-row justify-between items-center'>
                        <View>
                            <SemiBoldText className='text-4xl'>0 of 5</SemiBoldText>
                            <LightText>This week</LightText>
                        </View>
                        <View className='flex-row justify-between mt-2'>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                                <View key={index} className='flex items-center'>
                                    <View style={{backgroundColor: '#C7E0DA', borderRadius: 8}}
                                          className='w-5 h-12 rounded-2xl mr-1'/>
                                    <LightText className='mt-2'>{day}</LightText>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>
            </View>
            <View className='gap-y-3'>
                <HomeStatsItem title='Steps' value={2857} goalValue={5000}
                               image={require('../../../assets/images/home/shoe.png')} isDistance={false}/>
                <HomeStatsItem title='Distance' value={3015} goalValue={8000}
                               image={require('../../../assets/images/home/distance.png')} isDistance={true}/>
                <HomeStatsItem title='Energy burned' value={1966} goalValue={2500}
                               image={require('../../../assets/images/home/calorie.png')} isDistance={false}/>
            </View>
        </ScrollView>
    )
}

export default HomeScreen;
