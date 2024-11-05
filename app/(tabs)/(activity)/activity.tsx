import React, {useRef, useCallback, useMemo} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import ActivityItem from "@/components/ActivityItem";
import {FontAwesome6, MaterialIcons} from '@expo/vector-icons';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useRouter} from "expo-router";

const ActivityScreen = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapShots = useMemo(() => ['10%', '23%'], []);
    const router = useRouter();

    const handleOpenBottomSheet = () => {
        bottomSheetRef.current?.snapToIndex(1);
    };

    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
            />
        ),
        []
    );

    const activities: IActivity[] = [
        {activityType: 'Run', time: '07:31', distance: 3, duration: 30},
        {activityType: 'Walk', time: '09:31', distance: 1.6, duration: 25},
    ];

    return (
        <View className='flex-1'>
            <ScrollView className='w-full h-full px-4'>
                <RegularText className='text-lg text-center mt-4'>27 Oct - 2 Nov</RegularText>
                <View className='mt-8'>
                    <View className='flex-row items-center'>
                        <SemiBoldText className='text-5xl mr-1'>1</SemiBoldText>
                        <SemiBoldText className='text-2xl mr-1'>of</SemiBoldText>
                        <SemiBoldText className='text-5xl mr-1'>5</SemiBoldText>
                        <RegularText className='text-lg'>exercise days</RegularText>
                    </View>
                    <LightText className='text-lg'>You exercised a total of 1 time</LightText>
                </View>
                <View className='flex-row justify-between mt-8'>
                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                        <View key={index} className='flex items-center'>
                            <View className='w-8 h-14 bg-secondaryGreen rounded-2xl mr-1'/>
                            <LightText className='mt-2'>{day}</LightText>
                        </View>
                    ))}
                </View>
                <View className='mt-8'>
                    <ActivityItem date='Fri, 1 Nov' activities={activities}/>
                    <ActivityItem date='Fri, 1 Nov' activities={activities}/>
                </View>
            </ScrollView>

            <TouchableOpacity
                className='absolute bottom-2 right-4 bg-secondaryGreen py-4 px-6 rounded-3xl shadow-lg flex-row items-center'
                onPress={handleOpenBottomSheet}
            >
                <MaterialIcons name="add" size={24} color="#018673"/>
                <RegularText className='text-tintGreen text-lg ml-1.5'>Add Exercise</RegularText>
            </TouchableOpacity>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapShots}
                backgroundStyle={{backgroundColor: '#F4F4F4'}}
                backdropComponent={renderBackdrop}
                enablePanDownToClose={true}
            >
                <View className='p-4'>
                    <MediumText className='text-xl mb-4'>Add Exercise</MediumText>
                    <View className='flex-row justify-between items-center px-4'>
                        <TouchableOpacity className='bg-secondaryGreen flex-row items-center p-6 rounded-3xl'>
                            <FontAwesome6 name="person-running" size={20} color="black" />
                            <RegularText className='ml-2'>Start Tracking</RegularText>
                        </TouchableOpacity>
                        <TouchableOpacity className='bg-secondaryGreen flex-row items-center p-6 rounded-3xl' onPress={() => router.push('/add')}>
                            <FontAwesome6 name="pen" size={20} color="black" />
                            <RegularText className='ml-2'>Log Activity</RegularText>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
}

export default ActivityScreen;
