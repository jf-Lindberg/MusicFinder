import {useState, useEffect} from "react";
import MapView, {Callout, Marker} from "react-native-maps";
import * as Location from "expo-location";
import {musicEvent} from "../interface/event";
import {Button, StyleSheet, View} from "react-native";

export default function MapViewAllEvents({allEvents, setAllEvents}) {
    let eventsReturned: any[] = [];

    const mapMarkers = allEvents
        .map((event: musicEvent, index: number) => {
            try {
                if (event._embedded.attractions[0].externalLinks !== undefined && !eventsReturned.includes(event.name) && event.id !== 'Z698xZq2Z17b3Fg') {
                    eventsReturned.push(event.name);
                    return (
                        <Marker
                            key={event.id}
                            coordinate={{
                                latitude: parseFloat(event._embedded.venues[0].location.latitude),
                                longitude: parseFloat(event._embedded.venues[0].location.longitude)
                            }}
                            title={event._embedded.attractions[0].name}
                            description={event.name}>
                            <Callout>
                            </Callout>
                        </Marker>
                    )

                }
            } catch (e) {
            }

        });

    return (
        <MapView
            style={styles.map}
        >
            {mapMarkers}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,

    }
})
