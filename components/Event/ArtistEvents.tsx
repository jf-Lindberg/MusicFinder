import {useState} from "react";
import {ImageBackground, StyleSheet, Text, View, Image, FlatList, Pressable, Linking} from "react-native";
import getEventData from "../../models/getEventData";
import fonts from "../../styles/variables/fonts";
import colors from "../../styles/variables/colors";
import {RFValue} from "react-native-responsive-fontsize";
import RelatedEvents from "./RelatedEvents";
import spotifyApiConnect from "../../models/spotifyApiConnect";
import MapViewOfEvents from "./MapViewOfEvents";

export default function ArtistEvents({route, dimensions, navigation}) {
    const styles = StyleSheet.create({
        backgroundImageContainer: {
            height: dimensions.screen.height * 0.42
        },
        backgroundImage: {
            flex: 1,
            width: undefined,
            height: undefined
        },
        darkenBackground: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        artistInfoContainer: {
            marginTop: dimensions.screen.height * 0.13,
            marginLeft: dimensions.screen.width * 0.07,
        },
        artistImage: {
            width: dimensions.screen.width * 0.36,
            height: dimensions.screen.height * 0.12,
            borderRadius: 10
        },
        genre: {
            color: colors.bg,
            fontFamily: fonts.reg600,
            fontSize: RFValue(20, dimensions.standardScreenHeight),
            marginTop: dimensions.screen.height * 0.02
        },
        artist: {
            color: colors.bg,
            fontFamily: fonts.reg700,
            fontSize: RFValue(30, dimensions.standardScreenHeight),
        },
        navBar: {
            flexDirection: 'row',
            alignItems: 'center',
            height: dimensions.screen.height * 0.05,
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        },
        navItem: {
            color: colors.bg,
            fontFamily: fonts.reg400,
            fontSize: RFValue(18, dimensions.standardScreenHeight),
            marginLeft: 15,
            textAlign: 'center'
        },
        pressable: {
            height: dimensions.screen.height * 0.05,
            justifyContent: 'center',
            paddingHorizontal: dimensions.screen.width * 0.005
        },
        highlighted: {
            borderColor: colors.bg,
            borderBottomWidth: 1,
            borderStyle: 'solid'
        },
        bottomContent: {
            flex: 1
        }
    });

    const {event} = route.params;

    const [artistLink, setArtistLink] = useState(null);
    const [bottomContent, setBottomContent] = useState<number>(0);

    const artistImage = {
        uri: `${getEventData.getBestImage(event)}`
    }
    const genre = getEventData.getMainGenre(event);
    const artist = getEventData.getArtist(event);

    async function getSpotifyLink() {
        try {
            await spotifyApiConnect.findArtist(artist).then(r => {
                setArtistLink(r.tracks.items[0].artists[0].external_urls.spotify);
            })
        } catch (e) {
            setArtistLink(null);
        }
    }

    getSpotifyLink().then(r => 'ignored');

    return (
        <View style={{flex: 1}}>
            <View style={styles.backgroundImageContainer}>
                <ImageBackground
                    style={styles.backgroundImage}
                    source={artistImage}
                    blurRadius={11}
                    resizeMode='cover'
                >
                    <View style={styles.darkenBackground}>
                        <View style={styles.artistInfoContainer}>
                            <Image
                                style={styles.artistImage}
                                source={artistImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.genre}>{genre}</Text>
                            <Text style={styles.artist}>{artist}</Text>
                        </View>
                    </View>
                    <View style={styles.navBar}>
                        <Pressable
                            style={[styles.pressable, bottomContent === 0 && styles.highlighted]}
                            onPress={() => {
                                setBottomContent(0);
                            }}>
                            <Text style={styles.navItem}>Event</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.pressable, bottomContent === 1 && styles.highlighted]}
                            onPress={() => {
                                setBottomContent(1);
                            }}>
                            <Text style={styles.navItem}>Kartvy</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.pressable, bottomContent === 2 && styles.highlighted]}
                            onPress={() => {
                                Linking.openURL(`${artistLink}`).then(r => 'ignored');
                            }}>
                            <Text style={styles.navItem}>Lyssna på spotify</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.bottomContent}>
                {bottomContent === 0 && <RelatedEvents artist={artist} dimensions={dimensions} navigation={navigation}/>}
                {bottomContent === 1 && <MapViewOfEvents artist={artist} dimensions={dimensions} navigation={navigation}/>}
            </View>
        </View>
    )
}
