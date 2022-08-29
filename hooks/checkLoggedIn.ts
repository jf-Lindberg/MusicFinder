import tokenAuthentication from "../models/tokenAuthentication";

export default async function checkLoggedIn () {
    return await tokenAuthentication.loggedIn();
}
