import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventList from './EventList';
import SingularEventView from './SingularEventView';
import {Button, Text} from "react-native";

const Stack = createNativeStackNavigator();

export default function EventListNavigation({allEvents, setAllEvents, setIsVisible, isLoggedIn}) {
    return (
        <Stack.Navigator initialRouteName="Lista" screenOptions={{}}>
            <Stack.Screen name="Lista"
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
                          }}
            >
                {(screenProps) => <EventList allEvents={allEvents} setAllEvents={setAllEvents} {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Evenemang"
                          options={{
                              headerTitle: 'MusicFinder',
                              headerRight: () => (
                                  <Button
                                      onPress={() => alert('This is a button!')}
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
