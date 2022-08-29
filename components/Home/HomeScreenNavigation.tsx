import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from "./HomeScreen";
import ArtistEvents from "../Event/ArtistEvents";
import colors from "../../styles/variables/colors";
import SingleEvent from "../Event/SingleEvent";
import {Button, Pressable} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export default function HomeScreenNavigation({allEvents, dimensions}) {
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
                {(screenProps) => <HomeScreen allEvents={allEvents} dimensions={dimensions} {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Evenemang"
                options={ ({route}) => ({
                    title: route.params.name,
                    headerTransparent: true,
                    headerBackTitle: ''
                })}
            >
                {(screenProps) => <ArtistEvents dimensions={dimensions} {...screenProps}/>}
            </Stack.Screen>
            <Stack.Screen name="Single"
                          options={ ({route}) => ({
                              title: route.params.name,
                              headerTransparent: true,
                              headerBackTitle: '',
                              headerRight: () => (
                                  <Pressable
                                      onPress={() => console.log('This is a button!')}
                                  >
                                      <Ionicons name="md-heart-outline" size={24} color={colors.bg} />
                                  </Pressable>
                              )
                          })}
            >
                {(screenProps) => <SingleEvent dimensions={dimensions} {...screenProps}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
