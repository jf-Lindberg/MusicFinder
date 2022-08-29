import {Auth} from '../../interface/auth';
import {useState} from 'react';
import tokenAuthentication from '../../models/tokenAuthentication';
import UserForm from './UserForm';
import userValidation from "../../models/userValidation";

export default function Register({navigation, dimensions}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (userValidation.validateUser(auth.email, auth.password)) {
            await tokenAuthentication.register(auth.email, auth.password);
            navigation.navigate("Login");
        }
    }

    return (
        <UserForm
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            dimensions={dimensions}
            title="Registrera"
            navigation={navigation}
        />
    )
}
