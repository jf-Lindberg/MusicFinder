import {Auth} from '../../interface/auth';
import {useState} from 'react';
import tokenAuthentication from '../../models/tokenAuthentication';
import userValidation from "../../models/userValidation";
import UserForm from './UserForm';
import {showMessage} from "react-native-flash-message";

export default function Login({navigation, setIsLoggedIn}) {
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
        <UserForm
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            logout={doLogout}
            title="Logga in"
            navigation={navigation}
        />
    );
};
