import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventListNavigation from './components/EventListNavigation';
import {useEffect, useState} from "react";
import findEvents from "./models/ticketmasterApiConnect";
import {musicEvent} from "./interface/event";

const routeIcons: { [key: string]: string } = {
    "Sök": "home"
};

const Tab = createBottomTabNavigator();

export default function App() {
    const [allEvents, setAllEvents] = useState<Array<musicEvent>>([]);
    // const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        const getEvents = (async () => {
            setAllEvents(await findEvents());
        })
        getEvents().then(r => 'promise ignored');

        return setAllEvents([]);
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <NavigationContainer>
                <Tab.Navigator screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName = routeIcons[route.name] || "alert";

                        // @ts-ignore
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                    headerShown: false
                })}
                >
                    <Tab.Screen name="Sök">
                        {() => <EventListNavigation allEvents={allEvents} setAllEvents={setAllEvents}/>}
                    </Tab.Screen>
                    <Tab.Screen name="Karta">
                        {() => <MapViewNavigation/>}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});
