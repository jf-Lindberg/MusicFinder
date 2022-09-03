import ticketMasterApiConnect from "../models/ticketmasterApiConnect";
import {musicEvent} from "../interface/event";
import Geohash from "latlon-geohash";
import generateUserFriendlyEvent from "../models/generateUserFriendlyEvent";

const DEFAULT_GEOPOINT = Geohash.encode(<number>59.329249546700744, <number>18.068613228289472, 6);

export default async function getEvents(searchTerm: string = '', geoPoint: string | { coords: { latitude: number; longitude: number; }; } = DEFAULT_GEOPOINT) {
    let events = await ticketMasterApiConnect.findEvents(searchTerm, geoPoint);
    return events.filter((event: musicEvent) => {
        try {
            return event.id !== 'Z698xZq2Z17b3Fg' && event._embedded.attractions[0].externalLinks !== undefined
        } catch (e) {
        }
    }).map((event: musicEvent) => {
        return generateUserFriendlyEvent.create(event);
    });
};
