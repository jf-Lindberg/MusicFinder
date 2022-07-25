import {useEffect, useState} from "react";
import {Linking, StyleSheet, Text, View} from 'react-native';
import findArtist from "../models/spotifyApiConnect";

export default function SpotifyFrame ({...props}) {
    const [artistLink, setArtistLink] = useState(null);

    useEffect(() => {
        getArtist().then(r => 'promise ignored');

        return () => {
            setArtistLink(null);
        }
    }, [])

    async function getArtist() {
        try {
            await findArtist(props.name).then(r => {
                setArtistLink(r.tracks.items[0].artists[0].external_urls.spotify);
            })
        } catch (e) {
            setArtistLink(null);
        }
    }

    function render() {
        if (artistLink) {
            return (
                <View style={styles.container}>
                    <Text style={{color: 'blue'}}
                          onPress={() => Linking.openURL(`${artistLink}`)}>
                        LYSSNA HÄR!
                    </Text>
                </View>

            )
        }
        return null;
    }

    return (
        render()
    )
}

const styles = StyleSheet.create({
    container: {
        height: '10%',
        justifyContent: 'center',
    }
});
