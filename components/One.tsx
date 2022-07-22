import {View, Text} from "react-native";
import {useEffect, useState} from "react";
import findEvents from "../models/ticketmasterApiConnect";

export default function One() {
    const [allEvents, setAllEvents] = useState([]);

    async function getEvents() {
        setAllEvents(await findEvents());
    }

    useEffect(() => {
        getEvents();
        // console.log(allEvents);

        return setAllEvents([]);
    }, []);



    const listOfEvents = allEvents
        .map((event, index) => {
            return <View key={event.id}>
                <Text key={event.name}>{event.name}</Text>
            </View>
        });

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Tjohso</Text>
            {listOfEvents}
        </View>
    );
}
