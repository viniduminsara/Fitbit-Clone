import {View, TouchableOpacity, Image, ScrollView} from 'react-native';
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import {Feather, FontAwesome6} from "@expo/vector-icons";
import {useRouter} from "expo-router";

const YouScreen = () => {
    const router = useRouter();

    return(
        <ScrollView className='w-full h-full px-4'>
            <TouchableOpacity
                className='h-64 px-6 py-10 bg-white rounded-2xl flex justify-between mt-4'
                onPress={() => router.push('profile')}
            >
                <Image source={require('../../../assets/images/logo_black.png')} className='w-12 h-12'/>
                <View>
                    <SemiBoldText className='text-4xl'>Vinidu M</SemiBoldText>
                    <SemiBoldText>Joined 2024</SemiBoldText>
                    <SemiBoldText className='text-tintGreen'>Edit Profile</SemiBoldText>
                </View>
            </TouchableOpacity>

            <View className='mt-6'>
                <MediumText className='text-2xl mb-4'>Community</MediumText>
                <ScrollView className='' horizontal={true}>
                    <View className='mr-2'>
                        <Image source={require('../../../assets/images/community/family.png')} className='w-36 h-48 object-cover object-center'/>
                    </View>
                    <View className='mr-2'>
                        <Image source={require('../../../assets/images/community/firends.png')} className='w-36 h-48 object-cover object-center'/>
                    </View>
                    <View className='mr-2'>
                        <Image source={require('../../../assets/images/community/groups.png')} className='w-36 h-48 object-cover object-center'/>
                    </View>
                </ScrollView>
            </View>

            <View className='mt-6'>
                <MediumText className='text-2xl mb-4'>Goals</MediumText>
                <View className='flex-row'>
                    <TouchableOpacity
                        onPress={() => router.push('goal')}
                        className='bg-white w-40 h-56 p-6 mr-4 flex justify-between rounded-2xl'
                    >
                        <FontAwesome6 name="person-running" size={28} color="black" />
                        <View>
                            <MediumText className='text-xl'>Activity</MediumText>
                            <LightText className='text-lg'>5 goals</LightText>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push('goal')}
                        className='bg-white w-40 h-56 p-6 mr-4 flex justify-between rounded-2xl'
                    >
                        <Feather name="activity" size={28} color="black" />
                        <View>
                            <MediumText className='text-xl'>Health</MediumText>
                            <LightText className='text-lg'>2 goals</LightText>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default YouScreen;
