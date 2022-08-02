import {View, Text, TextInput, Button} from "react-native";

export default function AuthFields({auth, setAuth, title, submit, navigation}) {
    return (
        <View>
            <Text>{title}</Text>
            <Text>E-post</Text>
            <TextInput
                onChangeText={(content: string) => {
                    // validateEmail(content); -- deprecated
                    // now validated through validateUser in auth model
                    setAuth({...auth, email: content})
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text>Lösenord</Text>
            <TextInput
                onChangeText={(content: string) => {
                    // validatePassword(content); -- deprecated
                    // now validated on submit through validateUser in auth model
                    setAuth({...auth, password: content})
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
                accessibilityLabel={`${title} genom att trycka`}
            />
            {title === "Logga in" &&
                <Button
                    title="Registrera istället"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </View>
    );
};
