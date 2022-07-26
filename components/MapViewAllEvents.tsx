import MapView, {Callout, Marker} from "react-native-maps";
import {musicEvent} from "../interface/event";
import {StyleSheet, View, Text} from "react-native";

export default function MapViewAllEvents({allEvents, setAllEvents, navigation}) {
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
                    <Callout>
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
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,

    }
})
