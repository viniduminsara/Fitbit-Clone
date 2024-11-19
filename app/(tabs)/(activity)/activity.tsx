import React, {useRef, useCallback, useMemo} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import ActivityItem from "@/components/ActivityItem";
import {FontAwesome6, MaterialIcons} from '@expo/vector-icons';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useRouter} from "expo-router";
import {useAppContext} from "@/context/AppContext";

const ActivityScreen = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapShots = useMemo(() => ['10%', '23%'], []);
    const router = useRouter();
    const {userData, userMetricsData} = useAppContext();

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

    const getDateRange = () => {
        if (userMetricsData){
            const firstDate = new Date(userMetricsData[0].date);
            const lastDate = new Date(userMetricsData[userMetricsData.length - 1].date);

            // Format dates
            const formatDate = (date: Date) => date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

            return `${formatDate(firstDate)} - ${formatDate(lastDate)}`;
        }
    };

    return (
        <View className='flex-1'>
            <ScrollView className='w-full h-full px-4'>
                <RegularText className='text-lg text-center mt-4'>{getDateRange()}</RegularText>
                <View className='mt-8'>
                    <View className='flex-row items-center'>
                        <SemiBoldText className='text-5xl mr-1'>{userMetricsData?.filter(metric => metric.activities.length > 0).length}</SemiBoldText>
                        <SemiBoldText className='text-2xl mr-1'>of</SemiBoldText>
                        <SemiBoldText className='text-5xl mr-1'>{userData?.goals?.exerciseDays}</SemiBoldText>
                        <RegularText className='text-lg'>exercise days</RegularText>
                    </View>
                    <LightText className='text-lg'>You exercised a total of {userMetricsData?.reduce((count, metric) => count + metric.activities.length, 0)} time</LightText>
                </View>
                <View className='flex-row justify-between mt-8'>
                    {userMetricsData?.map((metric, index) => {
                        const date = new Date(metric.date);

                        return (
                            <View key={index} className='flex items-center'>
                                {metric.activities.length > 0 ?
                                    <View className='w-8 h-14 bg-tintGreen rounded-2xl mr-1'/>
                                    :
                                    <View className='w-8 h-14 bg-secondaryGreen rounded-2xl mr-1'/>
                                }
                                <LightText className='mt-2'>{date.toLocaleDateString('en-US', { weekday: 'short' })[0]}</LightText>
                            </View>
                        )
                    })}
                </View>
                <View className='mt-8'>
                    {userMetricsData?.map((metric, index) => {
                        const date = new Date(metric.date);

                        return (
                            <ActivityItem
                                key={index}
                                date={date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' })}
                                activities={metric.activities}
                            />
                        )
                    })}
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
