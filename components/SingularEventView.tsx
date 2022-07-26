import {View, Text, Image, StyleSheet, Linking, Button} from "react-native";
import SpotifyFrame from "./ShowSpotifyLinks";
import {useEffect, useState} from "react";
import getEventData from "../models/getEventData";

export default function SingularEventView({route, navigation}) {
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
            <Text style={{color: 'blue'}}
                  onPress={() => Linking.openURL(event.url)}>
                Köp biljetter
            </Text>
            <Button
                title='Gå tillbaka till listvyn'
                onPress={() => {
                    navigation.navigate('List');
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    artist: {
        fontSize: 24
    }
});
