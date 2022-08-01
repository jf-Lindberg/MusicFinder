import {Text, Button, ScrollView} from "react-native";
import {musicEvent} from "../interface/event";

export default function EventList({allEvents, setAllEvents, route, navigation}) {
    const listOfEvents = allEvents
        .map((event: musicEvent, index: number) => {
            return <Button
                title={event.name}
                key={index}
                onPress={() => {
                    navigation.navigate('Evenemang', {
                        event: event
                    });
                }}
            />
        });

    return (
        <ScrollView>
            <Text>EVENEMANG</Text>
            {listOfEvents}
        </ScrollView>
    );
}
