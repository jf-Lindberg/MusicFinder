import {View, Text, Image, StyleSheet, Linking, Button} from "react-native";
import SpotifyFrame from "./ShowSpotifyLinks";
import {useEffect, useState} from "react";

export default function SingularEventView({route, navigation}) {
    const {event} = route.params;
    console.log(event);

    const [imageLink, setImageLink] = useState(null);

    useEffect(() => {
        getBestImage();

        return () => {
            setImageLink(null);
        }
    }, [])

    function getBestImage () {
        let bestImage = event.images[0];
        for (let i = 0; i < event.images.length; i++) {
            if (event.images[i].width > bestImage.width) {
                bestImage = event.images[i];
            }
        }
        setImageLink(bestImage.url);
    }

    function getAddress () {
        try {
            return event._embedded.venues[0].address.line1;
        } catch (e) {
            return event._embedded.venues[0].name;
        }
    }

    return (
        <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View style={{width: '100%', height: '40%'}}>
                <Image
                    style={{flex: 1, width: undefined, height: undefined}}
                    resizeMode={'contain'}
                    source={{
                        uri: `${imageLink}`
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
                <Text>{getAddress()}, {event._embedded.venues[0].city.name}</Text>
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
