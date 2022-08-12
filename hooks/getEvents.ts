import findEvents from "../models/ticketmasterApiConnect";
import {musicEvent} from "../interface/event";

export default async function getEvents(setAllEvents) {
    let events = await findEvents();
    let filteredEvents = events.filter((event: musicEvent) => {
        try {
            return event.id !== 'Z698xZq2Z17b3Fg' && event._embedded.attractions[0].externalLinks !== undefined
        } catch (e) {
        }
    })
    setAllEvents(filteredEvents);
};
