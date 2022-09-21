import * as Location from "expo-location";
import Geohash from "latlon-geohash";

export default async function getUserCoords() {
    const {status} = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
        return {
            coords: {
                latitude: 56.16116302956264,
                longitude: 15.593437458169973
            },
            latitudeDelta: 2,
            longitudeDelta: 2
        }
    }
    const userCoords = await Location.getCurrentPositionAsync({});

    return Geohash.encode(<number>userCoords?.coords.latitude, <number>userCoords?.coords.longitude, 6);
}
