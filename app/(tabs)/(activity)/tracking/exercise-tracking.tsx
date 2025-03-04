import React, {useCallback, useEffect, useRef, useState} from "react";
import {ActivityIndicator, Alert, TouchableOpacity, View, BackHandler} from "react-native";
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from "react-native-maps";
import * as Location from 'expo-location';
import * as turf from '@turf/turf';
import Pin from "@/components/Pin";
import {BoldText, RegularText, SemiBoldText} from "@/components/StyledText";
import moment from 'moment';
import _ from "lodash";
import {customStyle} from "@/constants/mapStyle";
import {AntDesign, Entypo, FontAwesome5, FontAwesome6, Foundation, Ionicons} from "@expo/vector-icons";
import {useRouter, useNavigation} from "expo-router";
import {saveTrackingActivity} from "@/service/activityService";
import {useAppContext} from "@/context/AppContext";
import Spinner from "react-native-loading-spinner-overlay";
import {getMetricsData} from "@/service/metricsService";
import {ALERT_TYPE, Dialog} from "react-native-alert-notification";
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";
import * as commonFunc from "../../../../util/commonfunc";
import {exerciseData} from "@/constants/config";
import * as Notifications from 'expo-notifications';

type Coordinates = {
    latitude: number;
    longitude: number;
};

type Position = {
    coords: {
        accuracy: number,
        altitude: number,
        altitudeAccuracy: number,
        heading: number,
        latitude: number,
        longitude: number,
        speed: number,
    },
    timestamp: number,
};

const distanceBetween = (from: Position, to: Position) => {
    const options = { units: 'meters' };
    const origin = turf.point([from.coords.longitude, from.coords.latitude]);
    const destination = turf.point([to.coords.longitude, to.coords.latitude]);
    return turf.distance(origin, destination, options);
};

const paceBetween = (distance: number, from: Position, to: Position) => {
    const pace = (to.timestamp - from.timestamp) / distance;
    return pace;
};

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const ExerciseTrackingScreen = () => {
    const map = useRef<MapView>(null);
    const [location, setLocation] = useState<Coordinates | null>(null);
    const [positions, setPositions] = useState<Position[]>([]);
    const [duration, setDuration] = useState(0);
    const [distance, setDistance] = useState(0)
    const [isPaused, setIsPaused] = useState(false);
    const [isCountdown, setIsCountdown] = useState(false);
    const [selectedActivityType, setSelectedActivityType] = useState<string | null>(null);
    const [pace, setPace] = useState(0);
    const [startTime, setStartTime] = useState('');
    const [isLoading, setLoading] = useState(false);
    const watcherRef = useRef<{ remove: () => void } | null>(null);
    const router = useRouter();
    const navigation = useNavigation();
    const {userData, updateUserMetricsData} = useAppContext();

    useEffect(() => {
        // Request notification permissions
        const requestNotificationPermissions = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
        };

        requestNotificationPermissions();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access location was denied');
                return;
            }

            const loc = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
            });
            // Add initial position to the positions array
            setPositions([loc]);
        })();
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (selectedActivityType && !isPaused && !isCountdown) {
            interval = setInterval(() => {
                setDuration(prevDuration => prevDuration + 1);
            }, 1000);
        }

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [selectedActivityType, isPaused, isCountdown]);

    const startWatchingPosition = async () => {
        if (watcherRef.current) watcherRef.current.remove();
        // Correct options for high accuracy and frequent updates
        const options = {
            accuracy: Location.LocationAccuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 0
        };
        watcherRef.current = await Location.watchPositionAsync(options, onNewPosition);
    };

    useEffect(() => {

        if (selectedActivityType && !isPaused) {
            startWatchingPosition();
        } else if (isPaused && watcherRef.current) {
            watcherRef.current.remove(); // Stop tracking if paused
            watcherRef.current = null;
        }

        return () => {
            if (watcherRef.current) watcherRef.current.remove();
        };
    }, [selectedActivityType, isPaused]);

    useEffect(() => {
        const backAction = () => {
            if (selectedActivityType !== null && !isCountdown) {
                setIsPaused(true)
                Alert.alert(
                    'Exercise in Progress',
                    'Are you sure you want to exit? Your progress will be lost.',
                    [
                        {text: 'Cancel', onPress: () => setIsPaused(false), style: 'cancel'},
                        {
                            text: 'Exit',
                            onPress: () => {
                                resetTracking();
                                router.back();
                            }
                        },
                    ]
                );
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [selectedActivityType, isCountdown]);

    useEffect(() => {
        navigation.setOptions({
            gestureEnabled: !(selectedActivityType !== null && !isCountdown),
            headerLeft: () => null,
        });
    }, [navigation, selectedActivityType, isCountdown]);

    const onNewPosition = (position: Position) => {
        if (isPaused) return;

        console.log("onNewPosition", position);

        setPositions(prevPositions => {
            if (prevPositions.length === 0) {
                // If no previous positions, initialize with the new position
                return [position];
            }

            const lastPosition = prevPositions[prevPositions.length - 1];
            const newDistance = distanceBetween(lastPosition, position);

            // Update distance only if movement is detected
            if (newDistance > 0) {
                setDistance(prev => prev + newDistance);

                // Calculate pace only when distance is valid
                const timeDiff = position.timestamp - lastPosition.timestamp;
                if (timeDiff > 0) {
                    const newPace = timeDiff / newDistance; // seconds per meter
                    setPace(newPace);
                }
            }

            return [...prevPositions, position];
        });

        if (map.current) {
            map.current.animateCamera({
                center: position.coords,
                zoom: 18,
            }, { duration: 1000 });
        }
    };

    const currentPosition = positions[positions.length - 1];

    const formatValue = (seconds: number) => moment.utc(moment.duration(seconds, 's').asMilliseconds()).format('mm:ss')

    const handleActivityTypeSelect = (type: string) => {
        setIsCountdown(true);
        setSelectedActivityType(type);
        const formattedTime = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Set to true for 12-hour format
        });
        setStartTime(formattedTime);
    }

    const handleFinishActivity = () => {

        const { strideLength, caloriesPerKm } = exerciseData[selectedActivityType];

        if (distance > 500) {
            if (userData?.uid) {
                setLoading(true)

                const data = {
                    activityType: selectedActivityType?.toUpperCase(),
                    date: new Date(),
                    startTime: startTime,
                    activitySteps: strideLength > 0 ? Math.round(distance / strideLength) : 0,
                    activityDistance: distance,
                    activityCaloriesBurned: (caloriesPerKm * (distance / 1000)).toFixed(2)
                }

                saveTrackingActivity(userData.uid, data)
                    .then(() => {
                        getMetricsData(userData?.uid)
                            .then((res: any) => {
                                resetTracking();
                                updateUserMetricsData(res.data.body);
                                setLoading(false);
                                commonFunc.showToast(ALERT_TYPE.SUCCESS, "Success", "Activity saved successfully");
                                router.replace({
                                    pathname: '/tracking/exercise-complete',
                                    params: {exerciseType: selectedActivityType, distance: distance, duration: duration}
                                });
                            })
                            .catch((err) => {
                                setLoading(false);
                                commonFunc.showToast(ALERT_TYPE.DANGER, "Error", "Activity save unsuccessful");
                            })
                    })
                    .catch((err) => {
                        setLoading(false);
                        commonFunc.showToast(ALERT_TYPE.DANGER, "Error", "Activity save unsuccessful");
                    })
            }
        } else {
            Alert.alert(
                "Couldn't save workout",
                "You haven't tracked enough distance to save this workout.",
                [
                    {
                        text: "Discard",
                        onPress: () => {
                            resetTracking();
                            router.replace('/(activity)/activity');
                        },
                        style: "destructive",
                    },
                    {
                        text: "Resume workout",
                        onPress: () => setIsPaused(false),
                        style: "default",
                    },
                ],
                { cancelable: false }
            );
        }
    }

    const resetTracking = useCallback(() => {
        setDuration(0);
        setDistance(0);
        setPositions([]);
        setPace(0);
        setSelectedActivityType(null);
        setIsPaused(false);
        if (watcherRef.current) watcherRef.current.remove();
        watcherRef.current = null;
        setLocation(null);
        setStartTime('');
    }, []);

    const scheduleNotification = async (selectedActivityType: string | null) => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Exercise Started",
                body: `You have started your ${selectedActivityType} exercise!`,
                sound: true,
            },
            trigger: null,
        });
    };

    return (
        <View className="w-full h-5/6">
            <Spinner visible={isLoading} color='#08B9AF'/>
            {location ? (
                <>
                    <View className="px-6">
                        <MapView
                            ref={map}
                            zoomEnabled={true}
                            provider={PROVIDER_GOOGLE}
                            style={{ width: "100%", height: "85%" }}
                            showsUserLocation={false}
                            initialRegion={{
                                ...location,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            customMapStyle={customStyle}
                        >
                            <Marker
                                coordinate={currentPosition ? currentPosition.coords : { ...location }}
                                anchor={{ x: 0.5, y: 0.5 }}
                            >
                                <Pin/>
                            </Marker>
                            <Polyline
                                strokeColor="#018673"
                                strokeWidth={4}
                                coordinates={positions.map(position => position.coords)}
                            />
                        </MapView>
                    </View>
                    <View className='px-6'>
                        {selectedActivityType === null ? (
                            <>
                                <SemiBoldText className='text-center text-2xl mb-6'>Choose an exercise</SemiBoldText>
                                <View className='w-full flex-row justify-between items-center'>
                                    <View className='items-center'>
                                        <TouchableOpacity className='bg-secondaryGreen w-fit px-6 py-4 rounded-full' onPress={() => handleActivityTypeSelect('run')}>
                                            <FontAwesome5 name="running" size={24} color="black" />
                                        </TouchableOpacity>
                                        <RegularText className='mt-2 text-lg'>Run</RegularText>
                                    </View>
                                    <View className='items-center'>
                                        <TouchableOpacity className='bg-secondaryGreen w-fit px-6 py-4 rounded-full' onPress={() => handleActivityTypeSelect('walk')}>
                                            <FontAwesome6 name="person-walking" size={24} color="black" />
                                        </TouchableOpacity>
                                        <RegularText className='mt-2 text-lg'>Walk</RegularText>
                                    </View>
                                    <View className='items-center'>
                                        <TouchableOpacity className='bg-secondaryGreen w-fit px-6 py-4 rounded-full' onPress={() => handleActivityTypeSelect('hike')}>
                                            <Foundation name="mountains" size={24} color="black" />
                                        </TouchableOpacity>
                                        <RegularText className='mt-2 text-lg'>Hike</RegularText>
                                    </View>
                                    <View className='items-center'>
                                        <TouchableOpacity className='bg-secondaryGreen w-fit px-6 py-4 rounded-full' onPress={() => handleActivityTypeSelect('cycle')}>
                                            <Ionicons name="bicycle" size={24} color="black" />
                                        </TouchableOpacity>
                                        <RegularText className='mt-2 text-lg'>Cycle</RegularText>
                                    </View>
                                </View>
                            </>
                        ) : isCountdown ? (
                            <View className='flex justify-center items-center'>
                                <CountdownCircleTimer
                                    isPlaying
                                    duration={3}
                                    colors={'#018673'}
                                    size={150}
                                    onComplete={() => {
                                        setIsCountdown(false);
                                        scheduleNotification(selectedActivityType)
                                    }}
                                >
                                    {({ remainingTime }) => <BoldText className='text-4xl'>{remainingTime}</BoldText>}
                                </CountdownCircleTimer>
                            </View>
                        ) : (
                            <View className='h-48 flex justify-between'>
                                <View className='flex-row justify-around items-center gap-y-2'>
                                    <View className='items-center'>
                                        <RegularText className=''>Duration</RegularText>
                                        <SemiBoldText className='text-3xl'>{formatValue(duration)}</SemiBoldText>
                                    </View>
                                    <View className='items-center'>
                                        <RegularText className='mb-2'>Total Distance</RegularText>
                                        <BoldText className='text-7xl text-tintGreen'>{(_.round(distance) / 1000).toFixed(2)}</BoldText>
                                    </View>
                                    <View className='items-center w-[66px]'>
                                        <RegularText>Pace</RegularText>
                                        <SemiBoldText className='text-3xl'>{formatValue(pace) !== 'Invalid date' ? formatValue(pace).replace(':', "'") + '"' : '-'}</SemiBoldText>
                                    </View>
                                </View>
                                {!isPaused ? (
                                    <TouchableOpacity className='w-full bg-secondaryGreen justify-center items-center py-4 rounded-2xl' onPress={() => setIsPaused(prevState => !prevState)}>
                                        <AntDesign name="pause" size={24} color="#018673" />
                                    </TouchableOpacity>
                                ) : (
                                    <View className='flex-row justify-between'>
                                        <TouchableOpacity className='w-40 bg-secondaryGreen justify-center items-center py-4 rounded-2xl' onPress={() => setIsPaused(prevState => !prevState)}>
                                            <Entypo name="controller-play" size={24} color="#018673" />
                                        </TouchableOpacity>
                                        <TouchableOpacity className='w-40 bg-[#f7a399] justify-center items-center py-4 rounded-2xl' onPress={() => handleFinishActivity()}>
                                            <Entypo name="controller-stop" size={24} color="#ef6351" />
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                </>
            ) : (
                <View className='w-full h-full flex justify-center items-center'>
                    <ActivityIndicator size='large'/>
                </View>
            )}
        </View>
    );
};

export default ExerciseTrackingScreen;
