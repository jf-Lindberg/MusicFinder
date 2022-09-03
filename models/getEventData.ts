import ticketmasterApiConnect from "./ticketmasterApiConnect";
import {musicEvent} from "../interface/event";

export default {
    getBestImage: (event: { images: string | any[]; }) => {
        let bestImage = event.images[0];
        for (let i = 0; i < event.images.length; i++) {
            if (event.images[i].width > bestImage.width) {
                bestImage = event.images[i];
            }
        }
        return bestImage.url;
    },
    getAddress: (event: musicEvent) => {
        try {
            return event._embedded.venues[0].address.line1;
        } catch (e) {
            return event._embedded.venues[0].name;
        }
    },
    getAttractionEvents: async (attraction: string) => {
        return await ticketmasterApiConnect.findEvents(attraction);
    },
    getMainGenre: (event: musicEvent) => {
        try {
            const name = event._embedded.attractions[0].classifications[0].genre.name;
            return name !== 'Undefined' ? name : '';
        } catch (e) {
            return '';
        }
    },
    getArtist: (event: musicEvent) => {
        return event._embedded.attractions[0].name;
    }
}

