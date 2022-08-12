import AuthAPI from "../constants/AuthAPI";

import storage from './tokenStorage';

export default {
    loggedIn: async function loggedIn() {
        const token = await storage.readToken();
        let notExpired = false;
        if (token) {
            const twentyFourHours = 1000 * 60 * 60 * 24;
            notExpired = (new Date().getTime() - token.date) < twentyFourHours;
        }


        return token && notExpired;
    },
    login: async function login(email: string | undefined, password: string | undefined) {
        const data = {
            api_key: AuthAPI.id,
            email: email,
            password: password
        };
        const response = await fetch(`${AuthAPI.url}/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                message: result.errors.title,
                description: result.errors.detail,
                type: 'danger'
            }
        }

        await storage.storeToken(result.data.token);

        return {
            message: 'Inloggning lyckades',
            description: result.data.message,
            type: 'success'
        };
    },
    register: async function register(email: string | undefined, password: string | undefined) {
        const data = {
            api_key: AuthAPI.id,
            email: email,
            password: password
        };
        const response = await fetch(`${AuthAPI.url}/register`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });

        return await response.json();
    },
    logout: async function logout() {
        await storage.deleteToken();
    },
}
