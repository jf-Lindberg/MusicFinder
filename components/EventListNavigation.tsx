import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventList from './EventList';
import SingularEventView from './SingularEventView';

const Stack = createNativeStackNavigator();

export default function EventListNavigation({allEvents, setAllEvents}) {
    return (
        <Stack.Navigator initialRouteName="Lista" screenOptions={{
        }}>
            <Stack.Screen name="Lista">
                {(screenProps) => <EventList allEvents={allEvents} setAllEvents={setAllEvents} {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Evenemang">
                {(screenProps) => <SingularEventView {...screenProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
