import {createNativeStackNavigator} from '@react-navigation/native-stack';

import colors from "../../styles/variables/colors";
import SingleEvent from "../Event/SingleEvent";
import HeaderPressableHeart from "../HeaderPressableHeart";
import {RouteProp} from "@react-navigation/core";
import {ParamListBase} from "@react-navigation/routers";
import {Text} from "react-native";
import MapViewComp from "../MapViewComp";

const Stack = createNativeStackNavigator();

export default function MapViewNavigation({allEvents, dimensions, isLoggedIn}) {
    function headerRightContent(route: RouteProp<ParamListBase, "Single">) {
        if (isLoggedIn === null || isLoggedIn === false) {
            return () => <Text></Text>;
        }
        return () => (
            <HeaderPressableHeart event={route.params.event} heartColor={colors.bg}/>
        )

    }
    console.log(allEvents.length);

    return (
        <Stack.Navigator initialRouteName="Map"
                         screenOptions={{
                             headerTitleStyle: {
                                 color: colors.bg
                             },
                             headerTintColor: colors.bg
                         }}
        >
            <Stack.Screen name="Map"
                          options={ ({route}) => ({
                              headerShown: false
                          })}
            >
                {(screenProps) => <MapViewComp {...screenProps} events={allEvents} dimensions={dimensions}/>}
            </Stack.Screen>
            <Stack.Screen name="Single"
                          options={ ({route}) => ({
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
