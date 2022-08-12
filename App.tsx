import {useCallback, useEffect, useState} from "react";
import {Dimensions, SafeAreaView, StyleSheet, Text} from 'react-native';
import FlashMessage from "react-native-flash-message";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';

import {musicEvent} from "./interface/event";

import EventListNavigation from './components/EventListNavigation';
import MapViewNavigation from "./components/MapViewNavigation";
import UserNavigation from "./components/User/UserNavigation";
import SavedEvents from "./components/User/SavedEvents";
import HomeScreen from "./components/Home/HomeScreen";
import checkLoggedIn from "./hooks/checkLoggedIn";

import getEvents from "./hooks/getEvents";
import getFonts from "./hooks/loadFonts";

import colors from "./styles/variables/colors";

const routeIcons: { [key: string]: string } = {
    "Hem": "home",
    "Sök": "search",
    "Kartvy": "map-outline"
};

const Tab = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync().then(r => 'ignored');

export default function App() {
    const window = Dimensions.get("window");
    const screen = Dimensions.get("screen");
    const standardScreenHeight = 896;
    const [dimensions, setDimensions] = useState({window, screen, standardScreenHeight});
    const [appIsReady, setAppIsReady] = useState<Boolean>(false);
    const [allEvents, setAllEvents] = useState<Array<musicEvent>>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

    const [fontsLoaded] = getFonts();

    useEffect(() => {
        async function prepareApp() {
            try {
                await Promise.all(
                    [getEvents(setAllEvents),
                        checkLoggedIn(isLoggedIn, setIsLoggedIn)]
                )
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepareApp().then(r => 'ignored');

    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    const NavigationContainerTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: colors.bg
        },
    };

    if (!appIsReady || !fontsLoaded) {
        return null;
    }

    return (
        <>
            <SafeAreaView
                edges={["top"]}
                style={{flex: 0, backgroundColor: colors.blue}}
                onLayout={onLayoutRootView}
            />
            <SafeAreaView
                edges={["left", "right", "bottom"]}
                style={{
                    flex: 1,
                    backgroundColor: colors.bg,
                    position: "relative",
                }}
                onLayout={onLayoutRootView}
            >
                <StatusBar style="light"/>
                <NavigationContainer theme={NavigationContainerTheme}>
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
                        <Tab.Screen name="Hem">
                            {() => <HomeScreen allEvents={allEvents} dimensions={dimensions}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Sök">
                            {() => <EventListNavigation allEvents={allEvents} setAllEvents={setAllEvents}
                                                        isLoggedIn={isLoggedIn}/>}
                        </Tab.Screen>
                        <Tab.Screen name="Kartvy">
                            {() => <MapViewNavigation allEvents={allEvents} setAllEvents={setAllEvents}
                                                      isLoggedIn={isLoggedIn}/>}
                        </Tab.Screen>
                        {isLoggedIn ?
                            <Tab.Screen name="Mina sidor">
                                {() => <SavedEvents setIsLoggedIn={setIsLoggedIn}/>}
                            </Tab.Screen> :
                            <Tab.Screen name="Logga in">
                                {() => <UserNavigation setIsLoggedIn={setIsLoggedIn}/>}
                            </Tab.Screen>
                        }

                    </Tab.Navigator>
                </NavigationContainer>
                <FlashMessage position="top"/>
            </SafeAreaView>
        </>
    );
}
