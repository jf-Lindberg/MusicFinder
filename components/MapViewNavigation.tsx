import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MapViewAllEvents from './MapViewAllEvents';
import SingularEventView from './SingularEventView';

const Stack = createNativeStackNavigator();

export default function MapViewNavigation({allEvents, setAllEvents}) {
    return (
        <Stack.Navigator initialRouteName="Karta" screenOptions={{}}>
            <Stack.Screen name="Karta">
                {(screenProps) => <MapViewAllEvents allEvents={allEvents} setAllEvents={setAllEvents} {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Evenemang">
                {(screenProps) => <SingularEventView {...screenProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
