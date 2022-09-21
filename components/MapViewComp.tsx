import {StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import * as Location from "expo-location";
import MapView, {Callout, Marker} from "react-native-maps";
import {musicEvent} from "../interface/event";

export default function MapViewComp({events, navigation, dimensions, style}) {
    console.log(events);

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

    const [location, setLocation] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let isMounted = true;
        const userLocation = async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted" && isMounted) {
                setErrorMessage("Permission to access location was denied.");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            if (isMounted) {
                setLocation({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                })
                setLoaded(true);
            }
        }

        userLocation().then(r => 'ignored');

        return () => {
            isMounted = false;
            setLoaded(false);
        }
    }, []);

    const markers = events
        .map((event: cleanEvent, index: number) => {
            console.log(event.location);
            return (
                <Marker
                    key={event.id}
                    coordinate={{
                        latitude: parseFloat(event.location.latitude),
                        longitude: parseFloat(event.location.longitude)
                    }}
                    title={event.artist}
                    description={event.eventName}
                    image={require('../assets/marker-small.png')}
                >
                    <Callout
                        onPress={() => {
                            navigation.navigate('Single', {
                                event: event,
                                name: event.artist
                            });
                        }}
                    >
                        <View>
                            <Text>{event.artist}</Text>
                        </View>
                    </Callout>
                </Marker>
            )
        })

    const userMarker = () => {
        if (location !== null) {
            return (
                <Marker
                    coordinate={location}
                    title="Min plats"
                    image={require('../assets/marker-user.png')}
                />
            )
        }
    }

    if (style === 'single') {
        return (
            <MapView
                style={mapStyle.map}
                userInterfaceStyle={'dark'}
                region={{
                    longitude: parseFloat(events[0].location.longitude),
                    latitude: parseFloat(events[0].location.latitude),
                    latitudeDelta: 2,
                    longitudeDelta: 2
                }}
            >
                {markers}
                {userMarker()}
            </MapView>
        )
    }

    if (!loaded) {
        return (
            <MapView
                style={mapStyle.map}
                userInterfaceStyle={'dark'}
            >
                {markers}
                {userMarker()}
            </MapView>
        )
    }

    return (
        <MapView
            style={mapStyle.map}
            userInterfaceStyle={'dark'}
            region={{
                longitude: location.longitude,
                latitude: location.latitude,
                longitudeDelta: 2,
                latitudeDelta: 2
            }}
        >
            {markers}
            {userMarker()}
        </MapView>
    )
}
