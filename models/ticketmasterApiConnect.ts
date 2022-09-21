import Ticketmaster from "../constants/Ticketmaster";
import Geohash from "latlon-geohash";

const DEFAULT_GEOPOINT = Geohash.encode(<number>59.329249546700744, <number>18.068613228289472, 6);

export default {
    findEvents: async function (searchTerm: string = '', geoPoint: string | { coords: { latitude: number; longitude: number; }; } = DEFAULT_GEOPOINT) {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const url = Ticketmaster.url + '/events?keyword=' + encodedSearchTerm + '&geoPoint=' + geoPoint + '&size=200&classificationName=[music]&sort=distance,asc&apikey=' + Ticketmaster.key;
        console.log('Ticketmaster API: Fetching search results...');
        const response = await fetch(url)
            .then(r => r.json())
            .catch(err => {
                console.error('Request failed', err)
            })

        try {
            if (response.page.totalElements === 0) {
                console.log('Ticketmaster API: Search failed. No events match that search term.');
                throw new Error('No events match that search term');
            }
        } catch(e) {
            console.log(e);
        }


        console.log('Ticketmaster API: Done loading. Events array length: ' + response._embedded.events.length);
        return response._embedded.events;
    },
    getAttractionDetails: async function (id: string) {
        const url = Ticketmaster.url + '/attractions/' + id + '.json?apikey=' + Ticketmaster.key;
        console.log('Ticketmaster API: Fetching attraction...');
        const response = await fetch(url)
            .then(r => r.json())
            .catch(err => {
                console.error('Request failed', err)
            })

        return await response;
    },
    attractionSearch: async function (searchTerm: string | undefined) {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const url = Ticketmaster.url + '/attractions?keyword=' + encodedSearchTerm + '&apikey=' + Ticketmaster.key;
        console.log('Ticketmaster API: Searching for attraction...');
        const response = await fetch(url)
            .then(r => r.json())
            .catch(err => {
                console.error('Request failed', err)
            })

        console.log(response);

        console.log('No attraction found. Try searching for someone else...');
        return await response;
    }
}
