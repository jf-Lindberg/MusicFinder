interface cleanEvent {
    artist: string,
    genre: string,
    eventName: string,
    city: string,
    address: string,
    artistImage: string,
    year: string
    month: string,
    monthNumeric: string,
    day: string,
    weekday: string,
    id: string,
    images: string,
    dates: string,
    venues: Array<object>,
    externalLinks: object,
    location: {
        latitude: string,
        longitude: string
    }
}
