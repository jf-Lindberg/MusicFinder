import {musicEvent} from "../interface/event";
import getEventData from "./getEventData";

export default {
    create: (event: musicEvent) => {

        const eventName = event.name;
        const city = event._embedded.venues[0].city.name;

        const genre = getEventData.getMainGenre(event);

        const address = getEventData.getAddress(event);

        const artistImage = {
            uri: `${getEventData.getBestImage(event)}`
        };
        const artist = event._embedded.attractions[0].name;

        const date = new Date(event.dates.start.localDate);
        const year = date.toLocaleString('default', {year: 'numeric'});
        const month = date.toLocaleString('default', {month: 'short'});
        const monthNumeric = date.toLocaleString('default', {month: 'numeric'});
        const day = date.toLocaleString('default', {day: 'numeric'});
        const weekday = date.toLocaleString('default', {weekday: 'short'});

        const userFriendlyObject = {
            artist: artist,
            genre: genre,
            eventName: eventName,
            city: city,
            address: address,
            artistImage: artistImage,
            year: year,
            month: month,
            monthNumeric: monthNumeric,
            day: day,
            weekday: weekday,
            id: event.id,
            images: event.images,
            dates: event.dates,
            venues: event._embedded.venues,
            externalLinks: event._embedded.attractions[0].externalLinks,
            location: {
                latitude: event._embedded.venues[0].location.latitude,
                longitude: event._embedded.venues[0].location.longitude
            }
        }

        return userFriendlyObject;
    }
}
