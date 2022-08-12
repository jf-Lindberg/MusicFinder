import {Text, Button, ScrollView} from "react-native";
import {musicEvent} from "../interface/event";
import {useState} from "react";
import SearchBar from "./SearchBar";

export default function EventList({allEvents, setAllEvents, route, navigation}) {
    const [searchTerm, setSearchTerm] = useState('');

    const filterResults = (event) => {
        return event.name.includes(searchTerm) ||
            event._embedded.venues[0].city.name.includes(searchTerm);
    }

    const listOfEvents = allEvents
        .filter((event: musicEvent) => {
            return filterResults(event);
        })
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
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {listOfEvents}
        </ScrollView>
    );
}
