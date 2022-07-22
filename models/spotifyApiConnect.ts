import Spotify from '../constants/Spotify';

export default async function findArtist(artistName: string) {
    let encodedArtistName = encodeURIComponent(artistName);
    let authOptions = {
        method: 'POST',
        body: 'grant_type=client_credentials&client_id=' + Spotify.id + '&client_secret=' + Spotify.secret,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
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
    // response.then(r => {
    //     console.log(r.tracks.items[0].preview_url)
    // })
    console.log(response.tracks.items[0])
    // should just return response, not specifically the external url
    return response.tracks.items[0].artists[0].external_urls.spotify;
}
