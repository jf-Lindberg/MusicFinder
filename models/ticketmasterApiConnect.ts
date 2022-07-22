import Ticketmaster from "../constants/Ticketmaster";

export default async function findEvents() {
    const url = Ticketmaster.url + '/events?domain=sweden&countryCode=SE&size=10&classificationName=[music]&apikey=' + Ticketmaster.key;
    const response = await fetch(url)
        .then(r => r.json())
        .catch(err => {
            console.error('Request failed', err)
        })

    console.log('ASÖJDALSJKDFÖLKASDJLKASKDJLÖAS');
    console.log(response._embedded.events[4]);
    console.log('ASÖJDALSJKDFÖLKASDJLKASKDJLÖAS');
    return await response._embedded.events;
}
