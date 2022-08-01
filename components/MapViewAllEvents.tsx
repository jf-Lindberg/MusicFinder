import MapView, {Callout, Marker} from "react-native-maps";
import {musicEvent} from "../interface/event";
import {StyleSheet, View, Text} from "react-native";
import {useEffect, useState} from "react";
import * as Location from 'expo-location';

export default function MapViewAllEvents({allEvents, setAllEvents, navigation}) {
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            /*            if (status !== "granted") {
                            setErrorMessage("Permission to access location was denied.");
                            return;
                        }*/

            const currentLocation = await Location.getCurrentPositionAsync({});
            setUserLocation(
                <Marker
                    coordinate={{
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude
                    }}
                    pinColor="blue"
                    title="Min plats"
                />
            );
        })();
    }, []);

    const mapMarkers = allEvents
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
                            navigation.navigate('Evenemang', {
                                event: event
                            });
                        }}
                    >
                        <View>
                            <Text>{event._embedded.attractions[0].name}</Text>
                        </View>
                    </Callout>
                </Marker>
            )
        });

    return (
        <MapView
            style={styles.map}
        >
            {mapMarkers}
            {userLocation}
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})
