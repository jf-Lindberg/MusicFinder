import Ticketmaster from "../constants/Ticketmaster";

export default async function findEvents(searchTerm: string = '') {
    const url = Ticketmaster.url + '/events?keyword=' + searchTerm + '&domain=sweden&countryCode=SE&size=200&classificationName=[music]&apikey=' + Ticketmaster.key;
    console.log('Ticketmaster API: Fetching...');
    const response = await fetch(url)
        .then(r => r.json())
        .catch(err => {
            console.error('Request failed', err)
        })

    if (response.page.totalElements === 0) {
        console.log('Ticketmaster API: Search failed. No events match that search term.');
        throw new Error('No events match that search term');
    }

    console.log('Ticketmaster API: Done loading. Events array length: ' + response._embedded.events.length);
    return await response._embedded.events;
}
