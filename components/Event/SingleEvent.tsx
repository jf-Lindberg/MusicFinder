import {Button, Image, ImageBackground, Linking, Pressable, StyleSheet, Text, View} from "react-native";
import colors from "../../styles/variables/colors";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";
import MapView, {Callout, Marker} from "react-native-maps";
import {FontAwesome} from '@expo/vector-icons';
import generateUserFriendlyEvent from "../../models/generateUserFriendlyEvent";
import {useState} from "react";
import spotifyApiConnect from "../../models/spotifyApiConnect";
import MapViewComp from "../MapViewComp";

export default function SingleEvent({route, dimensions, navigation, isLoggedIn}) {
    const {event} = route.params;

    const styles = StyleSheet.create({
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
            alignItems: 'center'
        },
        artistImage: {
            width: dimensions.screen.width * 0.72,
            height: dimensions.screen.height * 0.24,
            borderRadius: 10
        },
        genre: {
            color: colors.bg,
            fontFamily: fonts.reg400,
            fontSize: RFValue(20, dimensions.standardScreenHeight)
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
        },
        map: {
            ...StyleSheet.absoluteFillObject,
            borderStyle: 'solid',
            borderColor: 'white',
            borderWidth: 1,
            borderRadius: 15
        }
    });
    const [artistLink, setArtistLink] = useState(null);

    const cleanEvent = generateUserFriendlyEvent.create(event);

    async function getSpotifyLink() {
        try {
            await spotifyApiConnect.findArtist(cleanEvent.artist).then(r => {
                setArtistLink(r.tracks.items[0].artists[0].external_urls.spotify);
            })
        } catch (e) {
            setArtistLink(null);
        }
    }

    getSpotifyLink().then(r => 'ignored');


    return (
        <View style={{flex: 1}}>
            <ImageBackground
                style={styles.backgroundImage}
                source={cleanEvent.artistImage}
                blurRadius={11}
                resizeMode='cover'
            >
                <View style={styles.darkenBackground}>
                    <Pressable
                        onPress={() => {
                            Linking.openURL(`${artistLink}`).then(r => 'ignored');
                        }}
                        style={styles.artistInfoContainer}>
                        <View>
                            <Image
                                style={styles.artistImage}
                                source={cleanEvent.artistImage}
                                resizeMode="cover"
                            />
                            <FontAwesome name="spotify" size={60} color="white" style={{marginLeft: dimensions.screen.width * 0.03, alignSelf: 'flex-end', marginTop: -dimensions.screen.height * 0.075, marginRight: dimensions.screen.width * 0.05}}/>
                        </View>
                    </Pressable>
                    <View style={{flexDirection: 'row', marginLeft: dimensions.screen.width * 0.07, marginTop: dimensions.screen.height * 0.03}}>
                        <View>
                            <Text style={styles.artist}>{cleanEvent.artist}</Text>
                            <Text
                                style={styles.genre}>{cleanEvent.day}/{cleanEvent.monthNumeric}/{cleanEvent.year}</Text>
                            <Text style={[styles.genre]}>{cleanEvent.address}, {cleanEvent.city}</Text>
                        </View>
                    </View>

                    <View style={{flex: 1, margin: 25}}>
                        <MapViewComp events={[event]} navigation={navigation} dimensions={dimensions} style="single"/>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

