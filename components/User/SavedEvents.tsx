import {
    Text,
    ScrollView,
    Button,
    View,
    Pressable,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity, RefreshControl
} from "react-native";
import {userData} from "../../models/userData";
import {musicEvent} from "../../interface/event";
import {useCallback, useEffect, useState} from "react";
import {useIsFocused, useNavigation} from '@react-navigation/native';
import tokenAuthentication from "../../models/tokenAuthentication";
import getEventData from "../../models/getEventData";
import generateUserFriendlyEvent from "../../models/generateUserFriendlyEvent";
import colors from "../../styles/variables/colors";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";
import HeaderPressableHeart from "../HeaderPressableHeart";


export default function SavedEvents({dimensions, setIsLoggedIn}) {
    const styles = StyleSheet.create({
        headerContainer: {
            backgroundColor: colors.blue,
            height: dimensions.screen.height * 0.125,
            paddingTop: dimensions.screen.height * 0.046,
            paddingLeft: dimensions.screen.width * 0.06,
            paddingRight: dimensions.screen.width * 0.06,
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        savedEventsText: {
            fontFamily: fonts.reg900,
            fontSize: RFValue(24, dimensions.standardScreenHeight),
            color: colors.bg
        },
        otherEventsContainer: {
            backgroundColor: '#f6f6f6',
            flex: 1
        },
        eventContainer: {
            backgroundColor: colors.bg,
            marginTop: dimensions.screen.height * 0.01,
            flexDirection: 'row',
            justifyContent: 'space-between',
            minHeight: dimensions.screen.height * 0.125,
            paddingVertical: dimensions.screen.height * 0.01,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00
        },
        dateContainer: {
            alignItems: 'center',
            paddingHorizontal: dimensions.screen.width * 0.06,
        },
        infoContainer: {
            width: dimensions.screen.width * 0.65,
        },
        month: {
            fontFamily: fonts.reg600,
            fontSize: RFValue(18, dimensions.standardScreenHeight),
            color: '#b9b9b9',
            textTransform: 'uppercase',
        },
        day: {
            fontFamily: fonts.reg400,
            fontSize: RFValue(24, dimensions.standardScreenHeight),
        },
        weekday: {
            fontFamily: fonts.reg400,
            fontSize: RFValue(16, dimensions.standardScreenHeight),
            color: '#b9b9b9'
        },
        city: {
            fontFamily: fonts.reg600,
            fontSize: RFValue(18, dimensions.standardScreenHeight),
        },
        eventName: {
            fontFamily: fonts.reg400,
            fontSize: RFValue(16, dimensions.standardScreenHeight),
            color: '#b9b9b9'
        },
        upcomingContainer: {
            padding: dimensions.screen.height * 0.02
        },
        upcoming: {
            fontFamily: fonts.reg600,
            fontSize: RFValue(20, dimensions.standardScreenHeight)
        },
        amountOfEvents: {
            fontFamily: fonts.reg600,
            fontSize: RFValue(16, dimensions.standardScreenHeight),
            color: '#b9b9b9'
        },
        loading: {
            fontFamily: fonts.reg600,
            fontSize: RFValue(16, dimensions.standardScreenHeight),
            color: '#b9b9b9',
            alignSelf: 'center'
        },
        artistImage: {
            width: dimensions.screen.width * 0.3,
            height: dimensions.screen.height * 0.125
        },
        signOut: {
            fontFamily: fonts.reg700,
            fontSize: RFValue(15, dimensions.standardScreenHeight),
            color: colors.bg,
            textDecorationLine: 'underline'
        },
        heartContainer: {
            justifyContent: 'center'
        },
        noSavedEvents: {
            textAlign: 'center',
            fontFamily: fonts.reg400,
            fontSize: RFValue(24, dimensions.standardScreenHeight),
            marginTop: dimensions.screen.height * 0.3
        }
    })

    const navigation = useNavigation();

    const [saved, setSaved] = useState<Array<musicEvent>>([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await getEvents();
        setRefreshing(false);
    }, []);

    const isFocused = useIsFocused();

    const getEvents = async () => {
        const user = await userData.get();
        const savedEvents = user.data
            .map((data: { artefact: string; }, index: number) => {
                return JSON.parse(data.artefact);
            })

        setSaved(savedEvents);
    }

    useEffect(() => {
        getEvents().then(r => 'ignored');
    }, [isFocused]);


    const listOfEvents = saved
        .map((event: musicEvent, index: number) => {
            const cleanEvent = generateUserFriendlyEvent.create(event);

            return (
                <Pressable
                    key={event.id}
                    onPress={() => {
                        navigation.navigate('Single', {
                            event: event,
                            name: `${cleanEvent.artist} - ${cleanEvent.city}`
                        })
                    }}
                >
                    {/* MAKE PRESSABLE BACKGROUND TO ARTIST IMAGE */}
                    <View key={index} style={styles.eventContainer}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.month}>{cleanEvent.month}</Text>
                            <Text style={styles.day}>{cleanEvent.day}</Text>
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.weekday}>{cleanEvent.weekday}</Text>
                            <Text style={styles.city}>{cleanEvent.city} {'\u2022'} {cleanEvent.address}</Text>
                            <Text style={styles.eventName}>{cleanEvent.eventName}</Text>
                        </View>
                        <View style={styles.heartContainer}>
                            <HeaderPressableHeart event={event} heartColor={colors.blue}/>
                        </View>
                    </View>
                </Pressable>
            )
        })

    async function doLogout () {
        await tokenAuthentication.logout();
        setIsLoggedIn(false);
    }

    return (
        <>
            <SafeAreaView
                edges={["top"]}
                style={{
                    flex: 0,
                    backgroundColor: colors.blue
                }}
            />
            <SafeAreaView
                edges={["left", "right", "bottom"]}
                style={{
                    flex: 1,
                    backgroundColor: colors.bg,
                    position: "relative",
                }}
            >
                <View style={styles.headerContainer}>
                    <Text style={styles.savedEventsText}>Sparade evenemang</Text>
                    <Text
                        style={styles.signOut}
                        onPress={() => {
                            doLogout().then(setIsLoggedIn(false));
                        }}
                    >Logga ut</Text>
                </View>
                <ScrollView
                    style={styles.otherEventsContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {saved.length > 0 ? listOfEvents : <Text style={styles.noSavedEvents}>Du har inga sparade evenemang.</Text>}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
