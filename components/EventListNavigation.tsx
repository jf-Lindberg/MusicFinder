import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventList from './EventList';
import SingularEventView from './SingularEventView';

const Stack = createNativeStackNavigator();

export default function EventListNavigation() {
    return (
        <Stack.Navigator initialRouteName="List" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="List">
                {(screenProps) => <EventList {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {(screenProps) => <SingularEventView {...screenProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
