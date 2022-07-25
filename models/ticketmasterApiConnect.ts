import Ticketmaster from "../constants/Ticketmaster";

export default async function findEvents() {
    const url = Ticketmaster.url + '/events?domain=sweden&countryCode=SE&size=200&classificationName=[music]&apikey=' + Ticketmaster.key;
    console.log('Ticketmaster API: Fetching...');
    const response = await fetch(url)
        .then(r => r.json())
        .catch(err => {
            console.error('Request failed', err)
        })

    console.log('Ticketmaster API: Done loading. Events array length: ' + response._embedded.events.length);
    return await response._embedded.events;
}
