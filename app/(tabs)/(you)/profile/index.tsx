import {ScrollView, TouchableOpacity, View} from "react-native";
import {LightText, RegularText, SemiBoldText} from "@/components/StyledText";
import ProfileItem from "@/components/ProfileItem";
import {useRouter} from "expo-router";

const ProfileScreen = () => {
    const router = useRouter();

    return (
        <ScrollView className='w-full h-full px-4'>
            <View className='mt-4 pr-4'>
                <View className='flex-row justify-between'>
                    <SemiBoldText className='text-xl'>Profile Information</SemiBoldText>
                    <TouchableOpacity onPress={() => router.push('profile/edit/info')}>
                        <RegularText className='text-lg text-tintGreen'>Edit</RegularText>
                    </TouchableOpacity>
                </View>
                <LightText className='text-justify mt-4'>The profile information you share is used to calculate some
                    metrics and personalize your experience</LightText>

                <View className='mt-6'>
                    <ProfileItem title='Height' value='172 cm'/>
                    <ProfileItem title='Weight' value='92 kg'/>
                    <ProfileItem title='Birthday' value='10 May 2005'/>
                    <ProfileItem title='Sex' value='Male'/>
                </View>
            </View>

            <View className='mt-4 pr-4'>
                <View className='flex-row justify-between'>
                    <SemiBoldText className='text-xl'>Social Profile</SemiBoldText>
                    <TouchableOpacity onPress={() => router.push('profile/edit/social')}>
                        <RegularText className='text-lg text-tintGreen'>Edit</RegularText>
                    </TouchableOpacity>
                </View>
                <LightText className='text-justify mt-4'>Your social profile information can be shown to your Fitbit
                    friends and groups. You can choose whether or not to share
                    your location with your friends.</LightText>

                <View className='mt-4'>
                    <ProfileItem title='Display name' value='Vinidu M.'/>
                    <ProfileItem title='Location' value='Sri Lanka'/>
                    <ProfileItem title='Your bio' value='Share your fitness goals'/>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen
