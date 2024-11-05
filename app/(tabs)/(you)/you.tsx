import ScreenLayout from "@/components/ScreenLayout";
import {View, Text, TextInput, TouchableOpacity, Image, ScrollView} from 'react-native';
import {MediumText, RegularText, SemiBoldText} from "@/components/StyledText";

const YouScreen = () => {

    return(
        <ScrollView className='w-full h-full px-4'>
            <TouchableOpacity className='h-64 px-6 py-10 bg-white rounded-2xl flex justify-between mt-4'>
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
                        <Image source={require('../../../assets/images/community/family.png')} className='object-cover object-center'/>
                    </View>
                    <View className='mr-2'>
                        <Image source={require('../../../assets/images/community/family.png')} className='object-cover object-center'/>
                    </View>
                    <View className='mr-2'>
                        <Image source={require('../../../assets/images/community/family.png')} className='object-cover object-center'/>
                    </View>
                    <View className='mr-2'>
                        <Image source={require('../../../assets/images/community/family.png')} className='object-cover object-center'/>
                    </View>
                </ScrollView>
            </View>
        </ScrollView>
    )
}

export default YouScreen;
