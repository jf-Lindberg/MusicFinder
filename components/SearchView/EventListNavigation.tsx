import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EventList from './EventList';
import {Button, Text} from "react-native";
import SingleEvent from "../Event/SingleEvent";
import {RouteProp} from "@react-navigation/core";
import {ParamListBase} from "@react-navigation/routers";
import HeaderPressableHeart from "../HeaderPressableHeart";
import colors from "../../styles/variables/colors";

const Stack = createNativeStackNavigator();

export default function EventListNavigation({allEvents, setAllEvents, isLoggedIn, dimensions}) {
    function headerRightContent(route: RouteProp<ParamListBase, "Single">) {
        if (isLoggedIn === null || isLoggedIn === false) {
            return () => <Text></Text>;
        }
        return () => (
            <HeaderPressableHeart event={route.params.event} heartColor={colors.bg}/>
        )

    }

    return (
        <Stack.Navigator initialRouteName="Lista" screenOptions={{}}>
            <Stack.Screen name="Lista"
                          options={{
                          }}
            >
                {(screenProps) => <EventList allEvents={allEvents} setAllEvents={setAllEvents} {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Single"
                          options={({route}) => ({
                              title: route.params.name,
                              headerTransparent: true,
                              headerBackTitle: '',
                              headerRight: headerRightContent(route)
                          })}
            >
                {(screenProps) => <SingleEvent {...screenProps} dimensions={dimensions} isLoggedIn={isLoggedIn}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
