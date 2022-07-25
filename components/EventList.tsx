import {Text, Button, ScrollView} from "react-native";
import {musicEvent} from "../interface/event";

export default function EventList({allEvents, setAllEvents, route, navigation}) {
    let eventsReturned: any[] = [];

    const listOfEvents = allEvents
        .map((event: musicEvent, index: number) => {
            try {
                if (event._embedded.attractions[0].externalLinks !== undefined && !eventsReturned.includes(event.name) && event.id !== 'Z698xZq2Z17b3Fg') {
                    eventsReturned.push(event.name);
                    return <Button
                        title={event.name}
                        key={index}
                        onPress={() => {
                            navigation.navigate('Details', {
                                event: event
                            });
                        }}
                    />

                }
            } catch (e) {
            }

        });

    return (
        <ScrollView>
            <Text>EVENEMANG</Text>
            {listOfEvents}
        </ScrollView>
    );
}
