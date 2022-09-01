import Spotify from '../constants/Spotify';

export default {
    findArtist: async function findArtist(artistName: string) {
        let cleanedArtistName = artistName.replace(/[^\w\s]/gi, '');
        let encodedArtistName = encodeURI(cleanedArtistName);
        let authOptions = {
            method: 'POST',
            body: 'grant_type=client_credentials&client_id=' + Spotify.id + '&client_secret=' + Spotify.secret,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        console.log('Spotify API: Fetching...');
        const response = await fetch(Spotify.token_url, authOptions)
            .then(r => r.json())
            .then(r => {
                const token = r.access_token;
                let url = `${Spotify.url}/search?q=artist:${encodedArtistName}&type=track&market=SE&limit=5`;
                let options = {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    },
                }
                return fetch(url, options)
            })
            .then(r => r.json())
            .catch(err => {
                console.error('Request failed', err)
            })

        if (response.tracks.items.length === 0) {
            console.log(`Spotify API: ${artistName} not found. Throwing error.`);
            throw new Error('No spotify page found for this artist');
        }

        console.log(`Spotify API: ${artistName} found. Returning response.`);
        return response;
    }
}
