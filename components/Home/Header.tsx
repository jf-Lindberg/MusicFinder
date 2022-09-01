import colors from "../../styles/variables/colors";
import {Typography} from "../../styles/index";
import {Text, View, StyleSheet, Pressable} from "react-native";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";
import tokenAuthentication from "../../models/tokenAuthentication";

export default function Header({dimensions, navigation, isLoggedIn, setIsLoggedIn}) {
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

    async function doLogout () {
        await tokenAuthentication.logout();
        setIsLoggedIn(false);
    }

    function renderLogInOut () {
        if (isLoggedIn) {
            return (
                <View style={styles.belowLogoContainer}>
                    <Text style={styles.belowLogo}>Välkommen till MusicFinder!</Text>
                    <Pressable
                        onPress={() => {
                            doLogout();
                        }}
                    >
                        <Text style={styles.signIn}>Logga ut</Text>
                    </Pressable>

                </View>
            )
        }
        return (
            <View style={styles.belowLogoContainer}>
                <Text style={styles.belowLogo}>Har du redan ett konto?</Text>
                <Pressable
                    onPress={() => {
                        navigation.navigate("Mina sidor")
                    }}
                >
                    <Text style={styles.signIn}>Logga in</Text>
                </Pressable>

            </View>
        )
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
                <Text style={styles.logo}>musicfinder<Text style={styles.registered}> ®</Text></Text>
            </View>
            {renderLogInOut()}
        </View>
    )
}

