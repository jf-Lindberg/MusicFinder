import {useEffect, useState} from "react";
import {musicEvent} from "../../interface/event";
import getEventData from "../../models/getEventData";
import MapView, {Callout, Marker} from "react-native-maps";
import {StyleSheet, Text, View} from "react-native";
import generateUserFriendlyEvent from "../../models/generateUserFriendlyEvent";

export default function MapViewOfAllEvents({dimensions, allEvents, navigation}) {
    const styles = StyleSheet.create({
        map: {
            ...StyleSheet.absoluteFillObject,
        }
    });

    const markers = allEvents
        .map((event: musicEvent, index: number) => {
            const cleanEvent = generateUserFriendlyEvent.create(event);

            return (
                <Marker
                    key={event.id}
                    coordinate={{
                        latitude: parseFloat(event._embedded.venues[0].location.latitude),
                        longitude: parseFloat(event._embedded.venues[0].location.longitude)
                    }}
                    title={cleanEvent.artist}
                    description={cleanEvent.eventName}
                >
                    <Callout
                        onPress={() => {
                            navigation.navigate('Single', {
                                event: event,
                                name: cleanEvent.artist
                            });
                        }}
                    >
                        <View>
                            <Text>{cleanEvent.artist}</Text>
                        </View>
                    </Callout>
                </Marker>
            )
        })

    return (
        <View style={{flex: 1}}>
            <Text>Hello!</Text>
            <MapView
                style={styles.map}
                userInterfaceStyle={'dark'}
            >
                {markers}
            </MapView>
        </View>
    )
}
