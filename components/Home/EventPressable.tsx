import {Image, Pressable, Text, View, StyleSheet} from "react-native";
import getEventData from "../../models/getEventData";
import fonts from "../../styles/variables/fonts";
import colors from "../../styles/variables/colors";
import {RFValue} from "react-native-responsive-fontsize";

export default function EventPressable({event, dimensions, imageScale}) {
    const scale = {
        width: 0.88 * imageScale.width,
        height: 0.23 * imageScale.height
    };

    const styles = StyleSheet.create({
        boxShadow: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62 * scale.width,
            paddingLeft: dimensions.screen.width * 0.06
        },
        artistImage: {
            width: dimensions.screen.width * scale.width,
            height: dimensions.screen.height * scale.height,
            borderRadius: 10,
        },
        headlinerText: {
            fontFamily: fonts.reg700,
            fontSize: RFValue(22, dimensions.standardScreenHeight),
            color: colors.text,
            marginLeft: dimensions.screen.width * 0.09,
            marginTop: 25
        }
    });

    return (
        <Pressable
            /*onPress={}*/
        >
            <View
                style={styles.boxShadow}
            >
                <Image
                    style={styles.artistImage}
                    source={{
                        uri: getEventData.getBestImage(event),
                    }}
                />
            </View>
            <Text style={styles.headlinerText}>{event._embedded.attractions[0].name}</Text>
        </Pressable>
    )

}

