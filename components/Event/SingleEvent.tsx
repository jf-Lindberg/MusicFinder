import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import getEventData from "../../models/getEventData";
import colors from "../../styles/variables/colors";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";
import MapView, {Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapStyle from "../../constants/MapStyle";
import {useState} from "react";

export default function SingleEvent({route, dimensions}) {
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
            marginLeft: dimensions.screen.width * 0.07,
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

    const [liked, setLiked] = useState<number>(-1);
    const isLiked = () => liked > -1;

    const eventName = event.name;
    const city = event._embedded.venues[0].city.name;
    let address = '';
    try {
        address = event._embedded.venues[0].address.line1;
    } catch (e) {
        // ...
    }

    const artistImage = {
        uri: `${getEventData.getBestImage(event)}`
    }
    const artist = getEventData.getArtist(event);


    return (
        <View style={{flex: 1}}>
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
                        <Text style={styles.artist}>{artist}</Text>
                        <Text style={styles.genre}>{address}, {city}</Text>
                        <Text style={styles.genre}>01/01/2001</Text>
                        {/*mapview*/}
                        {/*spotifylink*/}
                    </View>
                    <View style={{flex: 1, margin: 25}}>
                        <MapView
                            style={styles.map}
                            userInterfaceStyle={'dark'}
                            initialRegion={{
                                latitude: parseFloat(event._embedded.venues[0].location.latitude),
                                longitude: parseFloat(event._embedded.venues[0].location.longitude),
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
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
                        </MapView>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

