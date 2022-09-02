import {Text, Button, ScrollView, Pressable, View, StyleSheet, SafeAreaView} from "react-native";
import {musicEvent} from "../../interface/event";
import {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import getEvents from "../../hooks/getEvents";
import generateUserFriendlyEvent from "../../models/generateUserFriendlyEvent";
import HeaderPressableHeart from "../HeaderPressableHeart";
import colors from "../../styles/variables/colors";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";

export default function EventList({allEvents, route, navigation, location, dimensions, isLoggedIn}) {
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

    const [events, setEvents] = useState(allEvents);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const search = async () => {
            try {
                setEvents(await getEvents(searchTerm, location));
            } catch (e) {
                setEvents([]);
                console.log(e);
            }
        }

        search().then(r => 'ignored');
    }, [searchTerm]);

    const listOfEvents = events
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
                        {isLoggedIn ? <View style={styles.heartContainer}>
                            <HeaderPressableHeart event={event} heartColor={colors.blue}/>
                        </View> : <View style={styles.heartContainer}/>}
                    </View>
                </Pressable>
            )
        });

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
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} dimensions={dimensions}/>
                <ScrollView>
                    {listOfEvents}
                </ScrollView>
            </SafeAreaView>
        </>
    );
}
