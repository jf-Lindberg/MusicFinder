import {StatusBar} from 'expo-status-bar';
import {Button, Modal, SafeAreaView, StyleSheet, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import EventListNavigation from './components/EventListNavigation';
import {useEffect, useState} from "react";
import findEvents from "./models/ticketmasterApiConnect";
import {musicEvent} from "./interface/event";
import MapViewNavigation from "./components/MapViewNavigation";
import LoginModal from "./components/LoginModal";

const routeIcons: { [key: string]: string } = {
    "Sök": "search",
    "Kartvy": "map-outline"
};

const Tab = createBottomTabNavigator();


export default function App() {
    const [allEvents, setAllEvents] = useState<Array<musicEvent>>([]);
    const [isVisible, setIsVisible] = useState<Boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    useEffect(() => {
        const getEvents = (async () => {
            let events = await findEvents();
            let filteredEvents = events.filter((event: musicEvent) => {
                try {
                    return event.id !== 'Z698xZq2Z17b3Fg' && event._embedded.attractions[0].externalLinks !== undefined
                } catch (e) {
                }
            })
            setAllEvents(filteredEvents);
        })
        getEvents().then(r => 'ignored');

        return setAllEvents([]);
    }, []);

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <Modal
                animationType={"fade"}
                transparent={false}
                visible={isVisible}
                onRequestClose={() => {
                    console.log("Modal has been closed.")
                }}>
                <LoginModal setIsVisible={setIsVisible} setIsLoggedIn={setIsLoggedIn}/>
            </Modal>

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
                        {() => <EventListNavigation allEvents={allEvents} setAllEvents={setAllEvents} setIsVisible={setIsVisible} isLoggedIn={isLoggedIn}/>}
                    </Tab.Screen>
                    <Tab.Screen name="Kartvy">
                        {() => <MapViewNavigation allEvents={allEvents} setAllEvents={setAllEvents} setIsVisible={setIsVisible} isLoggedIn={isLoggedIn}/>}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
            <StatusBar style="auto"/>
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
