const getEventData = {
    getBestImage: function getBestImage(event) {
        let bestImage = event.images[0];
        for (let i = 0; i < event.images.length; i++) {
            if (event.images[i].width > bestImage.width) {
                bestImage = event.images[i];
            }
        }
        return bestImage.url;
    },
    getAddress: function getAddress(event) {
        try {
            return event._embedded.venues[0].address.line1;
        } catch (e) {
            return event._embedded.venues[0].name;
        }
    }
}

export default getEventData;

