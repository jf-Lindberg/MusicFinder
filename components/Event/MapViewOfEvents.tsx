import {useEffect, useState} from "react";
import {musicEvent} from "../../interface/event";
import getEventData from "../../models/getEventData";
import MapView, {Callout, Marker} from "react-native-maps";
import {StyleSheet, Text, View} from "react-native";

export default function MapViewOfEvents({artist, navigation}) {
    const styles = StyleSheet.create({
        map: {
            ...StyleSheet.absoluteFillObject,
        }
    })

    const [events, setEvents] = useState<Array<musicEvent>>([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        async function getEvents() {
            try {
                await getEventData.getAttractionEvents(artist)
                    .then(r => setEvents(r));
            } catch (e) {
                console.error(e)
            } finally {
                setDataLoaded(true);
            }

        }

        getEvents().then(r => 'ignored');
    }, []);

    const markers = events
        .map((event: musicEvent, index: number) => {
            return (
                <Marker
                    key={event.id}
                    coordinate={{
                        latitude: parseFloat(event._embedded.venues[0].location.latitude),
                        longitude: parseFloat(event._embedded.venues[0].location.longitude)
                    }}
                    title={event._embedded.attractions[0].name}
                    description={event.name}
                >
                    <Callout
                        onPress={() => {
                            navigation.navigate('Single', {
                                event: event,
                                name: event._embedded.attractions[0].name
                            });
                        }}
                    >
                        <View>
                            <Text>{event._embedded.attractions[0].name}</Text>
                        </View>
                    </Callout>
                </Marker>
            )
        })

    if (!dataLoaded) {
        return null;
    }

    return (
        <MapView
            style={styles.map}
            userInterfaceStyle={'dark'}
        >
            {markers}
        </MapView>
    )
}
