import tokenAuthentication from "../models/tokenAuthentication";

export default async function checkLoggedIn (isLoggedIn, setIsLoggedIn) {
    setIsLoggedIn(await tokenAuthentication.loggedIn());
}
