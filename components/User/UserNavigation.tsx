import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './Login';
import Register from './Register';
import colors from "../../styles/variables/colors";

const Stack = createNativeStackNavigator();

export default function UserNavigation(props: { setIsLoggedIn: any, dimensions: any }) {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown: false,
            headerTitleStyle: {
                color: colors.bg
            },
            headerTintColor: colors.bg
        }}>
            <Stack.Screen name="Login">
                {(screenProps) => <Login {...screenProps} setIsLoggedIn={props.setIsLoggedIn}
                                         dimensions={props.dimensions}/>}
            </Stack.Screen>
            <Stack.Screen name="Register"
                          options={({route}) => ({
                              headerShown: true,
                              headerTransparent: true,
                              headerTitle: '',
                              headerBackTitle: ''
                          })}
            >
                {(screenProps) => <Register {...screenProps} dimensions={props.dimensions}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};
