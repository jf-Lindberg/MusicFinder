import {View, Text, StyleSheet, ScrollView, Pressable} from "react-native";
import {useEffect, useState} from "react";
import getEventData from "../../models/getEventData";
import {musicEvent} from "../../interface/event";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";
import colors from "../../styles/variables/colors";
import generateUserFriendlyEvent from "../../models/generateUserFriendlyEvent";

export default function RelatedEvents({artist, dimensions, navigation}) {
    const styles = StyleSheet.create({
        otherEventsContainer: {
            backgroundColor: '#f6f6f6',
            flex: 1
        },
        eventContainer: {
            backgroundColor: colors.bg,
            marginTop: dimensions.screen.height * 0.01,
            flexDirection: 'row',
            minHeight: dimensions.screen.height * 0.125,
            paddingVertical: dimensions.screen.height * 0.01,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.00,
        },
        dateContainer: {
            alignItems: 'center',
            paddingHorizontal: dimensions.screen.width * 0.06,
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
        }
    })

    const [events, setEvents] = useState<Array<musicEvent>>([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        async function getEvents() {
            try {
                const evts = await getEventData.getAttractionEvents(artist);
                const cleanEvents = evts
                    .filter((event: musicEvent) => {
                        try {
                            return event.id !== 'Z698xZq2Z17b3Fg' && event._embedded.attractions[0].externalLinks !== undefined
                        } catch (e) {
                        }
                    })
                    .map((event: musicEvent) => {
                        return generateUserFriendlyEvent.create(event);
                })
                setEvents(cleanEvents);
            } catch (e) {
                console.error(e)
            } finally {
                setDataLoaded(true);
            }

        }

        getEvents().then(r => 'ignored');

        return;
    }, []);

    const theEvents = events
        .map((event: musicEvent, index: number) => {
            return (
                <Pressable
                    key={event.id}
                    onPress={() => {
                        navigation.navigate('Single', {
                            event: event,
                            name: `${event.artist} - ${event.city}`
                        })
                    }}
                >
                    <View key={index} style={styles.eventContainer}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.month}>{event.month}</Text>
                            <Text style={styles.day}>{event.day}</Text>
                        </View>
                        <View>
                            <Text style={styles.weekday}>{event.weekday}</Text>
                            <Text style={styles.city}>{event.city} {'\u2022'} {event.address}</Text>
                            <Text style={styles.eventName}>{event.eventName}</Text>
                        </View>
                    </View>
                </Pressable>
            )
        })

    const amountOfEvents = events.length;

    return (
        <ScrollView style={styles.otherEventsContainer}>
            <View style={styles.upcomingContainer}>
                <Text style={styles.upcoming}>Upcoming</Text>
                <Text style={styles.amountOfEvents}>{amountOfEvents} events</Text>
            </View>
            {dataLoaded ? theEvents : <Text style={styles.loading}>Laddar...</Text>}
        </ScrollView>
    )
}
