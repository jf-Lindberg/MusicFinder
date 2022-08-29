import {Text, SafeAreaView, View, StyleSheet, ScrollView} from "react-native";
import {Divider} from "@react-native-material/core";
import Header from "./Header";
import EventPressable from "./EventPressable";
import EventCarousel from "./EventCarousel";
import colors from "../../styles/variables/colors";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";

export default function HomeScreen({allEvents, dimensions, navigation}) {
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
                    <Header dimensions={dimensions} navigation={navigation}/>
                    <View style={{marginTop: -dimensions.screen.height * 0.033}}>
                        <EventPressable event={allEvents[0]} dimensions={dimensions} imageScale={{width: 1, height: 1}}
                                        navigation={navigation}/>
                    </View>
                    <View style={{marginTop: dimensions.screen.height * 0.065}}>
                        <EventCarousel events={[allEvents[1], allEvents[2], allEvents[3]]} dimensions={dimensions}
                                       imageScale={{width: 0.75, height: 0.75}} navigation={navigation}/>
                    </View>
                    <Divider style={styles.divider} leadingInset={24} trailingInset={24} color={colors.divider}/>
                    <View style={styles.popularContainer}>
                        <Text style={styles.popular}>Popular tickets</Text>
                    </View>
                    <View style={{marginTop: dimensions.screen.height * 0.065}}>
                        <EventCarousel events={[allEvents[4], allEvents[5], allEvents[6]]} dimensions={dimensions}
                                       imageScale={{width: 0.75, height: 0.75}} navigation={navigation}/>
                    </View>
                    <Divider style={styles.divider} leadingInset={24} trailingInset={24} color={colors.divider}/>
                    <View style={styles.popularContainer}>
                        <Text style={styles.popular}>Discover</Text>
                    </View>
                    <View style={{marginTop: dimensions.screen.height * 0.065}}>
                        <EventCarousel events={[allEvents[7], allEvents[8], allEvents[9]]} dimensions={dimensions}
                                       imageScale={{width: 0.75, height: 0.75}} navigation={navigation}/>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}


