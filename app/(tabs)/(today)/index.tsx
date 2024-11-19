import {View, ScrollView, TouchableOpacity} from 'react-native';
import HomeStats from "@/components/HomeStats/HomeStats";
import {LightText, MediumText, RegularText, SemiBoldText} from "@/components/StyledText";
import HomeStatsItem from "@/components/HomeStats/HomeStatsItem";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {Accelerometer} from "expo-sensors";
import {useAppContext} from "@/context/AppContext";
import {getMetricsData, updateMetricsData} from "@/service/metricsService";
import Spinner from "react-native-loading-spinner-overlay";
import {handleConnectionError} from "@/util/errors";
import {CALORIES_PER_STEP, STEP_LENGTH_METERS} from "@/constants/config";
import {ALERT_TYPE, Dialog} from "react-native-alert-notification";
import {Href, useRouter} from "expo-router";

const HomeScreen = () => {

    const [stats, setStats] = useState({
        steps: 0,
        distance: 0,
        calories: 0,
    });
    const [isCounting, setCounting] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const lastYRef = useRef(0);
    const lastTimestampRef = useRef(0);
    const accumulatedStepsRef = useRef(0);
    const {userData, userMetricsData, updateUserMetricsData} = useAppContext();
    const router = useRouter();

    const fetchMetricData = () => {
        if (userData?.uid) {
            setLoading(true);
            getMetricsData(userData?.uid)
                .then((res: any) => {
                    updateUserMetricsData(res.data);
                    const todayData = res.data[0];
                    setStats((prevState) => ({
                        steps: todayData.steps,
                        distance: todayData.distance,
                        calories: todayData.caloriesBurned
                    }))
                    setLoading(false);
                })
                .catch((err) => {
                    setLoading(false);
                    Dialog.show({
                        type: ALERT_TYPE.DANGER,
                        title: 'Danger',
                        textBody: 'Something went wrong!',
                        button: 'close',
                    })
                })
        }
    }

    useEffect(() => {
        fetchMetricData();
    }, []);

    useEffect(() => {
        if (userMetricsData) {
            setStats((prevState) => ({
                steps: userMetricsData[0].steps,
                distance: userMetricsData[0].distance,
                calories: userMetricsData[0].caloriesBurned
            }))
        }
    }, [userMetricsData]);

    const updateStats = useCallback(() => {
        setStats((prevState) => {
            const newSteps = prevState.steps + accumulatedStepsRef.current;

            if (userData?.uid){
                updateMetricsData(userData?.uid, {
                    steps: newSteps,
                    distance: ((newSteps * STEP_LENGTH_METERS) / 1000),
                    caloriesBurned: newSteps * CALORIES_PER_STEP
                })
                    .then((res) => console.log('Metrics updated!'))
                    .catch((err) => handleConnectionError())
            }

            return {
                steps: newSteps,
                distance: (newSteps * STEP_LENGTH_METERS) / 1000,
                calories: newSteps * CALORIES_PER_STEP,
            };
        });
        accumulatedStepsRef.current = 0; // Reset accumulated steps after updating
    }, []);

    useEffect(() => {
        let stepSubscription: any;

        Accelerometer.isAvailableAsync().then((result) => {
            if (result) {
                stepSubscription = Accelerometer.addListener((accelerometer) => {
                    const { y } = accelerometer;
                    const threshold = 0.1;
                    const timestamp = new Date().getTime();

                    if (
                        Math.abs(y - lastYRef.current) > threshold &&
                        !isCounting &&
                        timestamp - lastTimestampRef.current > 800
                    ) {
                        setCounting(true);
                        lastYRef.current = y;
                        lastTimestampRef.current = timestamp;

                        accumulatedStepsRef.current += 1;

                        if (accumulatedStepsRef.current >= 5 || timestamp - lastTimestampRef.current > 3000) {
                            updateStats();
                        }

                        setTimeout(() => {
                            setCounting(false);
                        }, 1200);
                    }
                });
            } else {
                console.log("Accelerometer not available on this device");
            }
        });

        return () => {
            if (stepSubscription) {
                stepSubscription.remove();
            }
        };
    }, [isCounting, updateStats]);

    // useEffect(() => {
    //     const getTodayStepData = async () => {
    //         const end = new Date();
    //         const start = new Date();
    //         start.setHours(0, 0, 0, 0); // Start of the day
    //
    //         const result = await Pedometer.getStepCountAsync(start, end);
    //         if (result) {
    //             const steps = result.steps;
    //
    //             const distance = (steps * STEP_LENGTH_METERS) / 1000;
    //
    //             const calories = steps * CALORIES_PER_STEP;
    //
    //             setStats({ steps, distance, calories, });
    //         }
    //     };
    //
    //     getTodayStepData().catch((e) => setIsHistoryStepsNA(true))
    // }, []);

    return (
        <ScrollView className='w-full h-full px-4'>
            <Spinner visible={isLoading} color='#08B9AF'/>
            <View className='items-center mt-4 mb-6'>
                <SemiBoldText className='text-xl'>Today</SemiBoldText>
            </View>
            <View className='flex justify-center items-center mb-4'>
                <HomeStats
                    title='Steps'
                    value={stats.steps}
                    goalValue={userData?.goals?.steps}
                    image={require('../../../assets/images/home/shoe.png')}
                    isSecondary={false}
                    isDistance={false}
                />
            </View>
            <View className='flex-row justify-around items-center'>
                <HomeStats
                    title='km'
                    value={stats.distance}
                    goalValue={userData?.goals?.distance ? (userData?.goals?.distance * 1000) : 0}
                    image={require('../../../assets/images/home/distance.png')}
                    isSecondary={true}
                    isDistance={true}
                />
                <HomeStats
                    title='cal'
                    value={stats.calories}
                    goalValue={userData?.goals?.energyBurned}
                    image={require('../../../assets/images/home/calorie.png')}
                    isSecondary={true}
                    isDistance={false}
                />
            </View>

            <View className='mt-4'>
                <RegularText className='text-lg mb-2 pl-2'>Activity</RegularText>
                <TouchableOpacity className='mb-3 bg-white p-4 rounded-2xl' onPress={() => router.replace('/(activity)/activity' as Href)}>
                    <MediumText className='text-lg mb-2'>Exercise days</MediumText>
                    <View className='flex-row justify-between items-center'>
                        <View>
                            <SemiBoldText className='text-4xl'>
                                {userMetricsData?.filter(metric => metric.activities.length > 0).length} of {userData?.goals?.exerciseDays}
                            </SemiBoldText>
                            <LightText>This week</LightText>
                        </View>
                        <View className='flex-row justify-between mt-2'>
                            {userMetricsData?.map((metric, index) => {
                                const date = new Date(metric.date);

                                return (
                                    <View key={index} className='flex items-center'>
                                        {metric.activities.length > 0 ?
                                            <View className='w-5 h-12 bg-tintGreen rounded-2xl mr-1'/>
                                            :
                                            <View className='w-5 h-12 bg-secondaryGreen rounded-2xl mr-1'/>
                                        }
                                        <LightText className='mt-2'>{date.toLocaleDateString('en-US', { weekday: 'short' })[0]}</LightText>
                                    </View>
                                )
                            })}
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View className='gap-y-3'>
                <HomeStatsItem title='Steps' value={stats.steps} goalValue={userData?.goals?.steps}
                               image={require('../../../assets/images/home/shoe.png')} isDistance={false}/>
                <HomeStatsItem title='Distance' value={stats.distance} goalValue={userData?.goals?.distance ? (userData?.goals?.distance * 1000) : 0}
                               image={require('../../../assets/images/home/distance.png')} isDistance={true}/>
                <HomeStatsItem title='Energy burned' value={stats.calories} goalValue={userData?.goals?.energyBurned}
                               image={require('../../../assets/images/home/calorie.png')} isDistance={false}/>
            </View>
        </ScrollView>
    )
}

export default HomeScreen;
