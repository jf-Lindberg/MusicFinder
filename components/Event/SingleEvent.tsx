import {Button, Image, ImageBackground, Linking, Pressable, StyleSheet, Text, View} from "react-native";
import colors from "../../styles/variables/colors";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";
import MapView, {Callout, Marker} from "react-native-maps";
import {FontAwesome} from '@expo/vector-icons';
import generateUserFriendlyEvent from "../../models/generateUserFriendlyEvent";

export default function SingleEvent({route, dimensions, navigation, isLoggedIn}) {
    const {event} = route.params;
    const {artistLink} = route.params;

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

    const cleanEvent = generateUserFriendlyEvent.create(event);

    return (
        <View style={{flex: 1}}>
            <ImageBackground
                style={styles.backgroundImage}
                source={cleanEvent.artistImage}
                blurRadius={11}
                resizeMode='cover'
            >
                <View style={styles.darkenBackground}>
                    <View style={styles.artistInfoContainer}>
                        <Image
                            style={styles.artistImage}
                            source={cleanEvent.artistImage}
                            resizeMode="cover"
                        />

                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Text style={styles.artist}>{cleanEvent.artist}</Text>
                                <Text
                                    style={styles.genre}>{cleanEvent.day}/{cleanEvent.monthNumeric}/{cleanEvent.year}</Text>
                            </View>
                        </View>
                        <Text style={[styles.genre]}>{cleanEvent.address}, {cleanEvent.city}</Text>
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
                                title={cleanEvent.artist}
                                description={cleanEvent.eventName}
                            >
                                <Callout>
                                    <View>
                                        <Text>{cleanEvent.artist}</Text>
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

