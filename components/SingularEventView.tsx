import {View, Text} from "react-native";
import SpotifyFrame from "./ShowSpotifyLinks";

export default function SingularEventView({route, navigation}) {
    const {event} = route.params;
    console.log(event._embedded.attractions[0].name);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>JUST DET HÄR EVENEMANGET</Text>
            <SpotifyFrame
                name={event._embedded.attractions[0].name}
            />
        </View>
    );
}
