import {ScrollView, View} from "react-native";
import {BoldText, SemiBoldText} from "@/components/StyledText";
import GoalItem from "@/components/GoalItem";
import {useAppContext} from "@/context/AppContext";

const GoalScreen = () => {
    const {userData} = useAppContext();

    return (
        <ScrollView className='w-full h-full px-4'>
            <SemiBoldText className='text-xl mt-4'>Activity</SemiBoldText>
            <View className='mt-4'>
                <GoalItem title='Exercise days' value={userData?.goals?.exerciseDays} isDaily={false} isDistance={false} path='exercise-days'/>
                <GoalItem title='Steps' value={userData?.goals?.steps} isDaily={true} isDistance={false} path='steps'/>
                <GoalItem title='Distance' value={userData?.goals?.distance} isDaily={true} isDistance={true} path='distance'/>
                <GoalItem title='Energy burned' value={userData?.goals?.energyBurned} isDaily={true} isDistance={false} path='energy-burned'/>
            </View>

            <SemiBoldText className='text-xl mt-4'>Health</SemiBoldText>
            <View className='mt-4'>
                <GoalItem title='Weight' value={userData?.goals?.weight} isDaily={true} isDistance={false} path='weight'/>
                <GoalItem title='Body fat' value={userData?.goals?.bodyFat} isDaily={true} isDistance={false} path='body-fat'/>
            </View>
        </ScrollView>
    )
}

export default GoalScreen;
