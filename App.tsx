import {useCallback, useEffect, useState} from "react";
import {Dimensions} from 'react-native';
import FlashMessage from "react-native-flash-message";
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {Ionicons} from '@expo/vector-icons';

import {musicEvent} from "./interface/event";

import UserNavigation from "./components/User/UserNavigation";
import checkLoggedIn from "./hooks/checkLoggedIn";

import getEvents from "./hooks/getEvents";
import getFonts from "./hooks/loadFonts";

import colors from "./styles/variables/colors";
import HomeScreenNavigation from "./components/Home/HomeScreenNavigation";
import getUserCoords from "./hooks/getUserCoords";
import SavedEventsNavigation from "./components/User/SavedEventsNavigation";
import MapViewNavigation from "./components/MapView/MapViewNavigation";
import EventListNavigation from "./components/SearchView/EventListNavigation";
import Geohash from "latlon-geohash";

const routeIcons: { [key: string]: string } = {
    "Hem": "home",
    "Sök": "search",
    "Kartvy": "map-outline",
    "Mina sidor": "menu"
};

const Tab = createBottomTabNavigator();
SplashScreen.preventAutoHideAsync().then(r => 'ignored');

// @refresh reset

export default function App() {
    const DEFAULT_GEOPOINT = Geohash.encode(59.329249546700744,18.068613228289472, 6);
    const window = Dimensions.get("window");
    const screen = Dimensions.get("screen");
    const standardScreenHeight = 896;
    const [dimensions, setDimensions] = useState({window, screen, standardScreenHeight});
    const [location, setLocation] = useState<string | { coords: { latitude: number; longitude: number; }; }>(DEFAULT_GEOPOINT);
    const [allEvents, setAllEvents] = useState<Array<musicEvent>>([]);
    const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
    const [appIsReady, setAppIsReady] = useState<Boolean>(false);

    const [fontsLoaded] = getFonts();

    useEffect(() => {
        async function prepareApp() {
            try {
                setAllEvents(await getEvents());
                setIsLoggedIn(await checkLoggedIn());
            } catch (e) {
                console.log(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepareApp().then(r => 'ignored');

        return setAllEvents([]);
    }, []);

    useEffect(() => {
        async function loadLocation() {
            try {
                const LOCATION = await getUserCoords();
                setAllEvents(await getEvents('', LOCATION));
                setLocation(LOCATION);
            } catch (e) {
                console.log(e);
            }
        }

        loadLocation().then(r => 'ignored');

        return setLocation(DEFAULT_GEOPOINT);
    }, [])


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
        <NavigationContainer
            theme={NavigationContainerTheme}
            onReady={onLayoutRootView}
        >
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName = routeIcons[route.name] || "alert";

                    // @ts-ignore
                    return <Ionicons name={iconName} size={size} color={color}/>;
                },
                tabBarActiveTintColor: '#0C8DF3',
                tabBarInactiveTintColor: '#838384',
                headerShown: false,
                tabBarStyle: {
                    height: dimensions.screen.height * 0.10,
                    backgroundColor: '#20262d'
                }
            })}
            >
                <Tab.Screen name="Hem">
                    {() => <HomeScreenNavigation allEvents={allEvents} dimensions={dimensions} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
                </Tab.Screen>
                <Tab.Screen name="Sök">
                    {() => <EventListNavigation allEvents={allEvents} setAllEvents={setAllEvents} dimensions={dimensions} isLoggedIn={isLoggedIn} location={location}/>}
                </Tab.Screen>
                <Tab.Screen name="Kartvy">
                    {() => <MapViewNavigation
                        allEvents={allEvents}
                        isLoggedIn={isLoggedIn}
                        dimensions={dimensions}
                    />}
                </Tab.Screen>
                {isLoggedIn ?
                    <Tab.Screen name="Mina sidor">
                        {() => <SavedEventsNavigation dimensions={dimensions} setIsLoggedIn={setIsLoggedIn}/>}
                    </Tab.Screen> :
                    <Tab.Screen name="Mina sidor">
                        {() => <UserNavigation setIsLoggedIn={setIsLoggedIn} dimensions={dimensions}/>}
                    </Tab.Screen>
                }

            </Tab.Navigator>
            <StatusBar style="light"/>
            <FlashMessage position="top"/>
        </NavigationContainer>
    );
}
