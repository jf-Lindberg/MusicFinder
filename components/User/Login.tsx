import {Auth} from '../../interface/auth';
import {useState} from 'react';
import tokenAuthentication from '../../models/tokenAuthentication';
import userValidation from "../../models/userValidation";
import UserForm from './UserForm';
import {showMessage} from "react-native-flash-message";
import {Text, View, StyleSheet} from "react-native";
import fonts from "../../styles/variables/fonts";
import {RFValue} from "react-native-responsive-fontsize";
import colors from "../../styles/variables/colors";


export default function Login({navigation, setIsLoggedIn, dimensions}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (userValidation.validateUser(auth.email, auth.password)) {
            const result = await tokenAuthentication.login(auth.email, auth.password);
            if (result.type === "success") {
                setIsLoggedIn(true);
            }
            showMessage(result);
        }
    }

    async function doLogout () {
        await tokenAuthentication.logout();
        setIsLoggedIn(false);
    }

    return (
        <View style={{flex: 1}}>
            <UserForm
                auth={auth}
                setAuth={setAuth}
                submit={doLogin}
                logout={doLogout}
                dimensions={dimensions}
                title="Logga in"
                navigation={navigation}
            />
        </View>

    );
};
