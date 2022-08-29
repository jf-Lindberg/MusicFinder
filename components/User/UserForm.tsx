import {View, Text, TextInput, Button, StyleSheet, Pressable} from "react-native";
import colors from "../../styles/variables/colors";
import fonts from "../../styles/variables/fonts";
import {Divider} from "@react-native-material/core";

export default function UserForm({auth, setAuth, title, submit, navigation, logout, dimensions}) {
    const styles = StyleSheet.create({
        backgroundContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.blue
        },
        input: {
            backgroundColor: '#fff',
            height: dimensions.screen.height * 0.049,
            width: dimensions.screen.width * 0.88,
            marginBottom: dimensions.screen.height * 0.03,
            paddingHorizontal: 5,
            fontFamily: fonts.reg400,
        },
        label: {
            color: colors.bg,
            fontFamily: fonts.reg600,
            marginBottom: dimensions.screen.height * 0.01
        },
        loginButton: {
            borderRadius: 3,
            justifyContent: 'center',
            alignItems: 'center'
        },
        loginText: {
            color: colors.blue,
            fontFamily: fonts.reg700
        },
        register: {
            color: colors.bg,
            fontFamily: fonts.reg600,
            textDecorationLine: 'underline'
        }
    })

    return (
        <View style={styles.backgroundContainer}>
            <View>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    onChangeText={(content: string) => {
                        setAuth({...auth, email: content})
                    }}
                    value={auth?.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <Text style={styles.label}>Lösenord</Text>
                <TextInput
                    onChangeText={(content: string) => {
                        setAuth({...auth, password: content})
                    }}
                    value={auth?.password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                />
                <Pressable
                    onPress={() => {
                        submit();
                    }}
                    accessibilityLabel={`${title} genom att trycka`}
                >
                    <View style={[styles.input, styles.loginButton]}>
                        <Text style={styles.loginText}>{title}</Text>
                    </View>
                </Pressable>
            </View>
            {title === "Logga in" &&
                <Pressable
                    onPress={() => {
                        navigation.navigate('Register');
                    }}
                >
                    <Text style={styles.register}>Registrera istället</Text>
                </Pressable>
            }
        </View>
    );
};
