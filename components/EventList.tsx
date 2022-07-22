import {View, Text, Button} from "react-native";
import {useEffect, useState} from "react";
import findEvents from "../models/ticketmasterApiConnect";
import {musicEvent} from "../interface/event";

export default function EventList({route, navigation}) {
    const [allEvents, setAllEvents] = useState([]);

    async function getEvents() {
        setAllEvents(await findEvents());
    }

    useEffect(() => {
        getEvents().then(r => 'promise ignored');

        return setAllEvents([]);
    }, []);

    let eventsReturned: any[] = [];

    const listOfEvents = allEvents
        .map((event: musicEvent, index) => {
            try {
                if (event._embedded.attractions[0].externalLinks !== undefined && !eventsReturned.includes(event.name)) {
                    eventsReturned.push(event.name);
                    return <Button
                        // title={event._embedded.attractions[0].name}
                        title={event.name}
                        key={index}
                        onPress={() => {
                            navigation.navigate('Details', {
                                event: event
                            });
                        }}
                    />
                    // return <View key={event.id}>
                    //     <Text key={event._embedded.attractions[0].name}>{event._embedded.attractions[0].name}</Text>
                    // </View> // SKAPA EGEN KOMPONENT SOM SER BRA UT

                }
            } catch (e) {
                console.log(e);
            }

        });

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>EVENEMANG</Text>
            {listOfEvents}
        </View>
    );
}
