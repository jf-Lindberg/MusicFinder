import {Button, SafeAreaView, Text, TextInput, View} from "react-native";

export default function LoginModal({auth, setAuth, title, submit, setIsVisible, navigation}) {
    return (
        <SafeAreaView>
            <View>
                <Text>E-post</Text>
                <TextInput
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    testID="email-field"
                />
                <Text>Lösenord</Text>
                <TextInput
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    testID="password-field"
                />
            </View>
            {/*LOGIN FIELDS*/}
            <Button
                title="Logga in"
            />
            <Button
                title="Registrera användare"
            />
            <Button
                title="Gå vidare som gäst"
                onPress ={() => (setIsVisible(false))}/>
        </SafeAreaView>
    )
        ;
};
