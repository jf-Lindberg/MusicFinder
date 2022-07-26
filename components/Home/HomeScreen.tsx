import {Text, SafeAreaView, View, StyleSheet, ScrollView} from "react-native";
import {Divider} from "@react-native-material/core";
import Header from "./Header";
import EventPressable from "./EventPressable";
import EventCarousel from "./EventCarousel";
import colors from "../../styles/variables/colors";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";

export default function HomeScreen({allEvents, dimensions, navigation, isLoggedIn, setIsLoggedIn}) {
    const styles = StyleSheet.create({
        divider: {
            marginTop: dimensions.screen.height * 0.05
        },
        popularContainer: {
            marginTop: dimensions.screen.height * 0.06
        },
        popular: {
            fontFamily: fonts.reg700,
            fontSize: RFValue(36, dimensions.standardScreenHeight),
            color: colors.text,
            marginLeft: dimensions.screen.width * 0.06,
        }
    });

    let listOfArtists: any[] = [];
    let displayedEvents: any[] = [];

    allEvents
        .map((event: cleanEvent) => {
            if (!listOfArtists.includes(event.artist)) {
                displayedEvents.push(event);
                listOfArtists.push(event.artist);
                return;
            } else {
                return;
            }
        })

    return (
        <>
            <SafeAreaView
                edges={["top"]}
                style={{
                    flex: 0,
                    backgroundColor: colors.blue
                }}
            />
            <SafeAreaView
                edges={["left", "right", "bottom"]}
                style={{
                    flex: 1,
                    backgroundColor: colors.bg,
                    position: "relative",
                }}
            >
                <ScrollView>
                    <Header dimensions={dimensions} navigation={navigation} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                    <View style={{marginTop: -dimensions.screen.height * 0.033}}>
                        <EventPressable event={displayedEvents[0]} dimensions={dimensions} imageScale={{width: 1, height: 1}}
                                        navigation={navigation}/>
                    </View>
                    <View style={{marginTop: dimensions.screen.height * 0.065}}>
                        <EventCarousel events={[displayedEvents[1], displayedEvents[2], displayedEvents[3]]} dimensions={dimensions}
                                       imageScale={{width: 0.75, height: 0.75}} navigation={navigation}/>
                    </View>
                    <Divider style={styles.divider} leadingInset={24} trailingInset={24} color={colors.divider}/>
                    <View style={styles.popularContainer}>
                        <Text style={styles.popular}>Popular tickets</Text>
                    </View>
                    <View style={{marginTop: dimensions.screen.height * 0.065}}>
                        <EventCarousel events={[displayedEvents[4], displayedEvents[5], displayedEvents[6]]} dimensions={dimensions}
                                       imageScale={{width: 0.75, height: 0.75}} navigation={navigation}/>
                    </View>
                    <Divider style={styles.divider} leadingInset={24} trailingInset={24} color={colors.divider}/>
                    <View style={styles.popularContainer}>
                        <Text style={styles.popular}>Discover</Text>
                    </View>
                    <View style={{marginTop: dimensions.screen.height * 0.065}}>
                        <EventCarousel events={[displayedEvents[7], displayedEvents[8], displayedEvents[9]]} dimensions={dimensions}
                                       imageScale={{width: 0.75, height: 0.75}} navigation={navigation}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}


