import {StatusBar} from 'expo-status-bar';
import {SafeAreaView, StyleSheet, Text, useWindowDimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventListNavigation from './components/EventListNavigation';
import SingularEventView from './components/SingularEventView';

export default function App() {
    const {height, width} = useWindowDimensions();
    const Tab = createBottomTabNavigator();

    return (
        <SafeAreaView
            style={{
                flex: 1
            }}
        >
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Evenemang">
                        {() => <EventListNavigation/>}
                    </Tab.Screen>
                    {/*<Tab.Screen name="Karta"/>*/}
                {/*    Undersök möjlighet att spara evenemang? Kan vara en logga-in funktion */}
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
