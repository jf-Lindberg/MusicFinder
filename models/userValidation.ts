import {showMessage} from "react-native-flash-message";

export default {
    validatePassword: function validatePassword(password: string | undefined) {
        if (password === undefined) {
            return false;
        }
        const pattern = /^(?=.*\d)(?=.*[a-z]).{4,}$/;
        return (password.match(pattern));
    },
    validateEmail: function validateEmail(email: string | undefined) {
        if (email === undefined) {
            return false;
        }
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (email.match(pattern));
    },
    validateUser: function validateUser(email: string | undefined, password: string | undefined) {
        if (!this.validateEmail(email)) {
            showMessage({
                message: "Email inte giltig",
                description: "Var vänlig ange en giltig email-address.",
                type: "warning"
            })
            return;
        }

        if (!this.validatePassword(password)) {
            showMessage({
                message: "Lösenordet inte giltigt",
                description: "Lösenordet behöver innehålla minst fyra tecken, en siffra och en bokstav.",
                type: "warning"
            })
            return;
        }

        return true;
    }
}
