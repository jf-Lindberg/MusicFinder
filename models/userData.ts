import AuthAPI from "../constants/AuthAPI";
import tokenStorage from "./tokenStorage";
import {musicEvent} from "../interface/event";

const userData = {
    get: async () => {
        try {
            const TOKEN = await tokenStorage.readToken();
            const OPTIONS = {
                headers: {
                    'x-access-token': TOKEN.token
                }
            };
            const response = await fetch(`${AuthAPI.url}/data?api_key=` + AuthAPI.id, OPTIONS)
                .then(r => r.json())
                .catch(err => {
                    console.error('Request failed', err)
                })

            return await response;
        }
        catch (e) {
            // ...
        }

    },
    includes: async (event: musicEvent) => {
        // Looks for event in userData and returns true if found, otherwise false
        try {
            const haystack = await userData.get();
            const needle = JSON.stringify(event);
            const index = haystack.data.findIndex(data => data.artefact === needle);
            return (index === -1 ? index : haystack.data[index].id)
        }
        catch (e) {
            // ...
        }
    },
    add: async (event: musicEvent) => {
        try {
            const artefact = JSON.stringify(event);
            const data = {
                artefact: artefact,
                api_key: AuthAPI.id
            }
            const TOKEN = await tokenStorage.readToken();
            const OPTIONS = {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': TOKEN.token
                }
            }

            const response = await fetch(`${AuthAPI.url}/data`, OPTIONS)
                .then(r => r.json())
                .catch(err => {
                    console.error('Request failed', err)
                })

            return await response;
        }
        catch (e) {
            // ...
        }

    },
    remove: async (id: number) => {
        try {
            const data = {
                id: id,
                api_key: AuthAPI.id
            };
            const TOKEN = await tokenStorage.readToken();
            const OPTIONS = {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': TOKEN.token
                }
            };

            await fetch(`${AuthAPI.url}/data`, OPTIONS);
        }
        catch (e) {
            // ...
        }

    }
}

export { userData };
