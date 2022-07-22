import {View, Text} from "react-native";
import SpotifyFrame from "./ShowSpotifyLinks";

export default function Two() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Test 2</Text>
            <SpotifyFrame/>
        </View>
    );
}
