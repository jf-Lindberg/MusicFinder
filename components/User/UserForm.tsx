import {View, Text, TextInput, Button} from "react-native";
import tokenAuthentication from "../../models/tokenAuthentication";

export default function UserForm({auth, setAuth, title, submit, navigation, logout}) {
    return (
        <View>
            <Text>{title}</Text>
            <Text>E-post</Text>
            <TextInput
                onChangeText={(content: string) => {
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
            <Button
                title="Logga ut"
                onPress={() => {
                    logout();
                }}
            />
        </View>
    );
};
