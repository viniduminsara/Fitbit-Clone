import { Tabs } from 'expo-router';
import Header from "@/components/Header";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import { View } from 'react-native';
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function TabLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Tabs screenOptions={{
                tabBarActiveTintColor: '#536762',
                header: () => <Header/>,
                tabBarStyle: {
                    height: 70,
                    backgroundColor: '#F4F4F4',
                    paddingBottom: 10,
                    paddingTop: 10,
                    elevation: 0,
                    shadowOffset: {
                        width: 0, height: 0
                    },
                    borderTopWidth: 0
                },
                tabBarLabelPosition: 'below-icon',
            }}>
                <Tabs.Screen
                    name="(today)"
                    options={{
                        title: 'Today',
                        tabBarIcon: ({ color, focused }) => (
                            <View style={{
                                backgroundColor: focused ? '#CDE8E1' : 'transparent',
                                paddingVertical: 5,
                                paddingHorizontal: 15,
                                borderRadius: 20,
                            }}>
                                <MaterialCommunityIcons
                                    name="weather-sunset"
                                    size={20}
                                    color="black"
                                />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="(activity)"
                    options={{
                        title: 'Activity',
                        tabBarIcon: ({ color, focused }) => (
                            <View style={{
                                backgroundColor: focused ? '#CDE8E1' : 'transparent',
                                paddingVertical: 5,
                                paddingHorizontal: 15,
                                borderRadius: 20,
                            }}>
                                <FontAwesome5
                                    name="clipboard"
                                    size={16}
                                    color="black"
                                />
                            </View>
                        ),
                    }}
                />
                <Tabs.Screen
                    name="you"
                    options={{
                        title: 'You',
                        tabBarIcon: ({ color, focused }) => (
                            <View style={{
                                backgroundColor: focused ? '#CDE8E1' : 'transparent',
                                paddingVertical: 5,
                                paddingHorizontal: 15,
                                borderRadius: 20,
                            }}>
                                <MaterialCommunityIcons
                                    name="view-dashboard-outline"
                                    size={20}
                                    color="black"
                                />
                            </View>
                        ),
                    }}
                />
            </Tabs>
        </GestureHandlerRootView>
    );
}
