import colors from "../../styles/variables/colors";
import {Typography} from "../../styles/index";
import {Text, View, StyleSheet, Pressable} from "react-native";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";

export default function Header({dimensions, navigation}) {
    const styles = StyleSheet.create({
        headerContainer: {
            backgroundColor: colors.blue,
            height: dimensions.screen.height * 0.174,
            paddingTop: dimensions.screen.height * 0.046,
            paddingLeft: dimensions.screen.width * 0.06,
            paddingRight: dimensions.screen.width * 0.06,
        },
        logoContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start'
        },
        logo: {
            fontFamily: fonts.italic900,
            fontSize: RFValue(30, dimensions.standardScreenHeight),
            color: colors.bg,
            lineHeight: 31
        },
        registered: {
            fontSize: RFValue(15, dimensions.standardScreenHeight)
        },
        belowLogoContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
        belowLogo: {
            fontFamily: fonts.reg400,
            fontSize: RFValue(15, dimensions.standardScreenHeight),
            color: colors.bg,
            lineHeight: 16
        },
        signIn: {
            fontFamily: fonts.reg700,
            fontSize: RFValue(15, dimensions.standardScreenHeight),
            color: colors.bg,
            textDecorationLine: 'underline',
            lineHeight: 16
        }
    });

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>musicfinder<Text style={styles.registered}> ®</Text></Text>
            </View>
            <View style={styles.belowLogoContainer}>
                <Text style={styles.belowLogo}>Already have tickets?</Text>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Logga in")
                    }}
                >
                    <Text style={styles.signIn}>Sign in</Text>
                </Pressable>

            </View>
        </View>
    )
}

