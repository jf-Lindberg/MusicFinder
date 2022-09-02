import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import * as Location from "expo-location";
import MapView, {Callout, Marker} from "react-native-maps";
import {musicEvent} from "../interface/event";
import generateUserFriendlyEvent from "../models/generateUserFriendlyEvent";

export default function MapViewComp({events, navigation, dimensions, style}) {
    console.log(style);
    const defaultMapStyle = StyleSheet.create({
        map: {
            ...StyleSheet.absoluteFillObject
        },

    });

    const [mapStyle, setMapStyle] = useState(defaultMapStyle);

    useEffect(() => {
        if (style === 'single') {
            setMapStyle(StyleSheet.create({
                map: {
                    ...StyleSheet.absoluteFillObject,
                    borderStyle: 'solid',
                    borderColor: 'white',
                    borderWidth: 1,
                    borderRadius: 15
                }
            }))
        }
    }, [])

    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMessage("Permission to access location was denied.");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                image={require('../assets/marker-user.png')}
            />)
        })();
    }, []);

    const markers = events
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
                    image={require('../assets/marker-small.png')}
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
        <MapView
            style={mapStyle.map}
            userInterfaceStyle={'dark'}
        >
            {markers}
            {locationMarker}
        </MapView>
    )
}
