// import {Auth} from '../../interfaces/auth';
import {useState} from 'react';
import tokenAuthentication from '../../models/tokenAuthentication';
import userValidation from "../../models/userValidation";
import UserForm from './UserForm';
import {showMessage} from "react-native-flash-message";

export default function Login({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState({});

    async function doLogin() {
        if (userValidation.validateUser(auth.email, auth.password)) {
            const result = await tokenAuthentication.login(auth.email, auth.password);
            if (result.type === "success") {
                setIsLoggedIn(true);
            }
            showMessage(result);
        }
    }

    return (
        <UserForm
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};
