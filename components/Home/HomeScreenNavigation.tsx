import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text} from 'react-native';

import HomeScreen from "./HomeScreen";
import ArtistEvents from "../Event/ArtistEvents";
import colors from "../../styles/variables/colors";
import SingleEvent from "../Event/SingleEvent";
import HeaderPressableHeart from "../HeaderPressableHeart";
import { RouteProp } from '@react-navigation/core';
import { ParamListBase } from '@react-navigation/routers';

const Stack = createNativeStackNavigator();


export default function HomeScreenNavigation({allEvents, dimensions, isLoggedIn, setIsLoggedIn}) {
    function headerRightContent(route: RouteProp<ParamListBase, "Single">) {
        if (isLoggedIn === null || isLoggedIn === false) {
            return () => <Text></Text>;
        }
        return () => (
            <HeaderPressableHeart event={route.params.event} heartColor={colors.bg}/>
        )

    }

    return (
        <Stack.Navigator initialRouteName="Lista"
                         screenOptions={{
                             headerTitleStyle: {
                                 color: colors.bg
                             },
                             headerTintColor: colors.bg
                         }}
        >
            <Stack.Screen name="Home"
                          options={{
                              headerShown: false,
                          }}
            >
                {(screenProps) => <HomeScreen {...screenProps} allEvents={allEvents} dimensions={dimensions} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
            </Stack.Screen>
            <Stack.Screen name="Evenemang"
                          options={({route}) => ({
                              title: route.params.name,
                              headerTransparent: true,
                              headerBackTitle: ''
                          })}
            >
                {(screenProps) => <ArtistEvents dimensions={dimensions} {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Single"
                          options={({route}) => ({
                              title: route.params.name,
                              headerTransparent: true,
                              headerBackTitle: '',
                              headerRight: headerRightContent(route)
                          })}
            >
                {(screenProps) => <SingleEvent dimensions={dimensions} {...screenProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
