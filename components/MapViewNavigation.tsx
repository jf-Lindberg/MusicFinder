import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MapViewAllEvents from './MapViewAllEvents';
import SingularEventView from './SingularEventView';
import {Button, Text} from "react-native";

const Stack = createNativeStackNavigator();

export default function MapViewNavigation({allEvents, setAllEvents, setIsVisible, isLoggedIn}) {
    return (
        <Stack.Navigator initialRouteName="Karta" screenOptions={{}}>
            <Stack.Screen name="Karta"
                          options={{
                              headerTitle: () => (
                                  <Text>MusicFinder</Text>
                              ),
                              headerRight: () => (
                                  <Button
                                      onPress={() => setIsVisible(true)}
                                      title={isLoggedIn ? 'Min profil' : 'Logga in'}
                                      color='#000'
                                  />
                              )
                          }}>
                {(screenProps) => <MapViewAllEvents allEvents={allEvents} setAllEvents={setAllEvents} {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Evenemang"
                          options={{
                              headerTitle: () => (
                                  <Text>MusicFinder</Text>
                              ),
                              headerRight: () => (
                                  <Button
                                      onPress={() => setIsVisible(true)}
                                      title={isLoggedIn ? 'Min profil' : 'Logga in'}
                                      color='#000'
                                  />
                              )
                          }}>
                {(screenProps) => <SingularEventView {...screenProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
