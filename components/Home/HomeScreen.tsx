import {Text, SafeAreaView, View, StyleSheet, ScrollView} from "react-native";
import {Divider} from "@react-native-material/core";
import {musicEvent} from "../../interface/event";
import Header from "./Header";
import EventPressable from "./EventPressable";
import EventCarousel from "./EventCarousel";
import colors from "../../styles/variables/colors";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";

export default function HomeScreen({allEvents, dimensions}) {
    // console.log(allEvents[1]._embedded.attractions[0]);

    // NAMN = allEvents[INDEX]._embedded.attractions[0].name
    // BILDER = allEvents[1]._embedded.attractions[0].images

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
    })

    const listOfEvents = allEvents
        .map((event: musicEvent, index: number) => {
            return <Text>{event.name}</Text>
        });

    console.log(allEvents[11]);

    return (
        <ScrollView>
            <Header dimensions={dimensions}/>
            <View style={{marginTop: -dimensions.screen.height * 0.033}}>
                <EventPressable event={allEvents[1]} dimensions={dimensions} imageScale={{width: 1, height: 1}}/>
            </View>
            <View style={{marginTop: dimensions.screen.height * 0.065}}>
                <EventCarousel events={[allEvents[5], allEvents[3], allEvents[6]]} dimensions={dimensions}
                               imageScale={{width: 0.75, height: 0.75}}/>
            </View>
            <Divider style={styles.divider} leadingInset={24} trailingInset={24} color={colors.divider}/>
            <View style={styles.popularContainer}>
                <Text style={styles.popular}>Popular tickets</Text>
            </View>
            <View style={{marginTop: dimensions.screen.height * 0.065}}>
                <EventCarousel events={[allEvents[11], allEvents[18], allEvents[15]]} dimensions={dimensions}
                               imageScale={{width: 0.75, height: 0.75}}/>
            </View>
            <Divider style={styles.divider} leadingInset={24} trailingInset={24} color={colors.divider}/>
            <View style={styles.popularContainer}>
                <Text style={styles.popular}>Discover</Text>
            </View>
            <View style={{marginTop: dimensions.screen.height * 0.065}}>
                <EventCarousel events={[allEvents[17], allEvents[8], allEvents[21]]} dimensions={dimensions}
                               imageScale={{width: 0.75, height: 0.75}}/>
            </View>
        </ScrollView>
    )
}


