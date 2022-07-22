import {useEffect, useState} from "react";
import {Linking, Text} from 'react-native';
import findArtist from "../models/spotifyApiConnect";

export default function SpotifyFrame () {
    const [artistLink, setArtistLink] = useState(null);

    async function getArtist() {
        setArtistLink(await findArtist('Rammstein'));
    }

    useEffect(() => {
        getArtist();

        return setArtistLink(null);
    }, [])

    return (
        <Text style={{color: 'blue'}}
              onPress={() => Linking.openURL(`${artistLink}`)}>
            Artisten är här
        </Text>
    )
}
