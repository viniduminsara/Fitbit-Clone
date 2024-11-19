import {ScrollView, TouchableOpacity, View} from "react-native";
import {LightText, RegularText, SemiBoldText} from "@/components/StyledText";
import ProfileItem from "@/components/ProfileItem";
import {Href, useRouter} from "expo-router";
import {MaterialIcons} from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import {useAppContext} from "@/context/AppContext";
import Spinner from 'react-native-loading-spinner-overlay';
import {useState} from "react";
import {ALERT_TYPE, Dialog} from "react-native-alert-notification";

const ProfileScreen = () => {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const {userData, logoutUser} = useAppContext();

    const handleLogout = () => {
        Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Warning',
            textBody: 'Are you sure to logout from your account?',
            button: 'Logout',
            onPressButton: () => {
                Dialog.hide();
                setLoading(true);
                auth()
                    .signOut()
                    .then(() => {
                        setLoading(false);
                        router.replace('/(auth)/welcome' as Href);
                        logoutUser();
                    });
            }
        });
    }

    return (
        <ScrollView className='w-full h-full px-4'>
            <Spinner visible={isLoading} color='#08B9AF'/>
            <View className='mt-4 pr-4'>
                <View className='flex-row justify-between'>
                    <SemiBoldText className='text-xl'>Profile Information</SemiBoldText>
                    <TouchableOpacity onPress={() => router.push('profile/edit/info' as Href)}>
                        <RegularText className='text-lg text-tintGreen'>Edit</RegularText>
                    </TouchableOpacity>
                </View>
                <LightText className='text-justify mt-4'>The profile information you share is used to calculate some
                    metrics and personalize your experience</LightText>

                <View className='mt-6'>
                    <ProfileItem title='Height' value={`${userData?.height} cm`}/>
                    <ProfileItem title='Weight' value={`${userData?.weight} kg`}/>
                    <ProfileItem title='Gender' value={`${userData?.gender}`}/>
                </View>
            </View>

            <View className='mt-4 pr-4'>
                <View className='flex-row justify-between'>
                    <SemiBoldText className='text-xl'>Social Profile</SemiBoldText>
                    <TouchableOpacity onPress={() => router.push('profile/edit/social' as Href)}>
                        <RegularText className='text-lg text-tintGreen'>Edit</RegularText>
                    </TouchableOpacity>
                </View>
                <LightText className='text-justify mt-4'>Your social profile information can be shown to your Fitbit
                    friends and groups. You can choose whether or not to share
                    your location with your friends.</LightText>

                <View className='mt-4'>
                    <ProfileItem title='Display name' value={`${userData?.displayName}`}/>
                </View>

                <TouchableOpacity
                    onPress={handleLogout}
                    className='w-full h-16 mt-8 bg-white p-4 mb-2 rounded-2xl flex-row items-center'
                >
                    <MaterialIcons name="logout" size={24} color="red" />
                    <SemiBoldText className='text-lg text-red-400 ml-2'>Logout</SemiBoldText>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default ProfileScreen
