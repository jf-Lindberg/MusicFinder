import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SavedEvents from './SavedEvents';
import SingleEvent from '../Event/SingleEvent';
import HeaderPressableHeart from "../HeaderPressableHeart";
import colors from "../../styles/variables/colors";

const Stack = createNativeStackNavigator();

export default function SavedEventsNavigation(props: { setIsLoggedIn: any, dimensions: any}) {
    return (
        <Stack.Navigator initialRouteName="Saved" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Saved">
                {(screenProps) => <SavedEvents {...screenProps} setIsLoggedIn={props.setIsLoggedIn} dimensions={props.dimensions}/>}
            </Stack.Screen>
            <Stack.Screen name="Single"
                          options={ ({route}) => ({
                              title: route.params.name,
                              headerShown: true,
                              headerTitleStyle: {
                                  color: colors.bg
                              },
                              headerTintColor: colors.bg,
                              headerTransparent: true,
                              headerBackTitle: '',
                              headerRight: () => (
                                  <HeaderPressableHeart event={route.params.event} heartColor={colors.bg}/>
                              )
                          })}
            >
                {(screenProps) => <SingleEvent {...screenProps} dimensions={props.dimensions}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
