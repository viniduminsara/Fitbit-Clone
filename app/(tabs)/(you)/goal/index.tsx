import {ScrollView, View} from "react-native";
import {BoldText, SemiBoldText} from "@/components/StyledText";
import GoalItem from "@/components/GoalItem";

const GoalScreen = () => {

    return (
        <ScrollView className='w-full h-full px-4'>
            <SemiBoldText className='text-xl mt-4'>Activity</SemiBoldText>
            <View className='mt-4'>
                <GoalItem title='Exercise days' value={5} isDaily={false} isDistance={false} path='exercise-days'/>
                <GoalItem title='Steps' value={10000} isDaily={true} isDistance={false} path='steps'/>
                <GoalItem title='Distance' value={8000} isDaily={true} isDistance={true} path='distance'/>
                <GoalItem title='Energy burned' value={2700} isDaily={true} isDistance={false} path='energy-burned'/>
            </View>

            <SemiBoldText className='text-xl mt-4'>Health</SemiBoldText>
            <View className='mt-4'>
                <GoalItem title='Weight' value={75} isDaily={true} isDistance={false} path='weight'/>
                <GoalItem title='Body fat' value={12} isDaily={true} isDistance={false} path='body-fat'/>
            </View>
        </ScrollView>
    )
}

export default GoalScreen;
