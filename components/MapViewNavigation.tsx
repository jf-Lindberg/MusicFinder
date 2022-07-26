import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MapViewAllEvents from './MapViewAllEvents';
import SingularEventView from './SingularEventView';

const Stack = createNativeStackNavigator();

export default function MapViewNavigation({allEvents, setAllEvents}) {
    return (
        <Stack.Navigator initialRouteName="MapView" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="MapView">
                {(screenProps) => <MapViewAllEvents allEvents={allEvents} setAllEvents={setAllEvents} {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Details">
                {(screenProps) => <SingularEventView {...screenProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
