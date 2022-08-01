import {View, Text, Image, StyleSheet, Linking} from "react-native";
import SpotifyFrame from "./ShowSpotifyLinks";
import getEventData from "../models/getEventData";
import MapView, {Marker} from "react-native-maps";

export default function SingularEventView({route}) {
    const {event} = route.params;
    console.log(event);

    return (
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View style={{width: '100%', height: '40%'}}>
                <Image
                    style={{flex: 1, width: undefined, height: undefined}}
                    resizeMode={'contain'}
                    source={{
                        uri: `${getEventData.getBestImage(event)}`
                    }}
                />
            </View>
            <View>
                <Text style={styles.artist}>{event._embedded.attractions[0].name}</Text>
                <Text>{event._embedded.venues[0].city.name}</Text>
                <Text>{event.dates.start.localDate}</Text>
            </View>
            <SpotifyFrame
                name={event._embedded.attractions[0].name}
            />
            <View>
                <Text>Address:</Text>
                <Text>{getEventData.getAddress(event)}, {event._embedded.venues[0].city.name}</Text>
            </View>
            <View style={{flex: 1}}>
                <MapView style={styles.map}>
                    <Marker
                        key={event.id}
                        coordinate={{
                            latitude: parseFloat(event._embedded.venues[0].location.latitude),
                            longitude: parseFloat(event._embedded.venues[0].location.longitude)
                        }}
                        title={event._embedded.attractions[0].name}
                        description={event.name}
                    />
                </MapView>
            </View>
            <Text style={{color: 'blue'}}
                  onPress={() => Linking.openURL(event.url)}>
                Köp biljetter
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    artist: {
        fontSize: 24
    }
});
