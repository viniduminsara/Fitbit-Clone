import {View} from "react-native";
import {LightText, MediumText, SemiBoldText} from "@/components/StyledText";

interface IActivityItemProps {
    date: string;
    activities: IActivity[];
}

const ActivityItem = ({date, activities}: IActivityItemProps) => {

    if (activities.length <= 0) return;

    return (
        <View>
            <SemiBoldText className='text-lg mb-2'>{date}</SemiBoldText>
            {activities.map((activity, index) => (
                <View key={index} className='bg-white flex-row justify-between items-center p-4 rounded-2xl mb-2'>
                    <MediumText>{activity.startTime}</MediumText>
                    <View>
                        <SemiBoldText className='text-2xl text-right'>{activity.activityType}</SemiBoldText>
                        <LightText>{activity.activityDistance / 1000} km  {activity.activityCaloriesBurned} cal</LightText>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default ActivityItem;
