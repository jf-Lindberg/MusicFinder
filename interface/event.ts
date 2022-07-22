interface attractions {
    // links to data sets
    _links: object
    // Type of the entity
    type: string
    // Unique id of the entity in the discovery API
    id: string
    // Locale in which the content is returned
    locale: string
    // Name of the entity
    name: string
    // Description's of the entity
    description: string
    // Additional information of the entity
    additionalInfo: string
    // URL of a web site detail page of the entity
    url: string
    // Images of the entity
    images: Array<object>
    // Attraction's classifications
    classifications: Array<object>
    // List of external links
    externalLinks: object
    // Indicate if this is a test entity, by default test entities won't appear in discovery API
    test: boolean
    // List of aliases for entity
    aliases: Array<object>
    // List of localized aliases for entity
    localizedAliases: object
    // number of upcoming events
    upcomingEvents: object
}

interface _embedded {
    venues: Array<object>,
    attractions: Array<attractions>
}

interface musicEvent {
    // links to data sets
    _links: object
    // Container with venue, attractions
    _embedded: _embedded
    // Type of the entity
    type: string
    // double
    distance: number
    // No description specified
    units: string
    // No description specified
    location: object
    // Unique id of the entity in the discovery API
    id: string
    // Locale in which the content is returned
    locale: string
    // Name of the entity
    name: string
    // Description's of the entity
    description: string
    // Additional information of the entity
    additionalInfo: string
    // URL of a web site detail page of the entity
    url: string
    // Images of the entity
    images: Array<object>
    // Event's dates information
    dates: object
    // Event's sales dates information
    sales: object
    // Any information related to the event
    info: string
    // Any notes related to the event
    pleaseNote: string
    // Price ranges of this event
    priceRanges: Array<object>
    // Event's promoter
    promoter: object
    // Event's promoters
    promoters: Array<object>
    // Related outlets informations
    outlets: Array<object>
    // Product type
    productType: string
    // Related products informations
    products: Array<object>
    // Event's seatmap
    seatmap: object
    // Additional information for people who experience disabilities
    accessibility: object
    // ticket limit
    ticketLimit: object
    // Event's classifications
    classifications: Array<object>
    // Place has the information on where the event happens. It can be set if there is no venue
    place: object
    // List of external links
    externalLinks: object
    // Indicate if this is a test entity, by default test entities won't appear in discovery API
    test: boolean
    // List of aliases for entity
    aliases: Array<object>
    // List of localized aliases for entity
    localizedAliases: object
}

export {musicEvent};
