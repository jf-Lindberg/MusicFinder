import {Text, ScrollView, Button} from "react-native";
import {userData} from "../../models/userData";
import {musicEvent} from "../../interface/event";
import {useEffect, useState} from "react";
import tokenAuthentication from "../../models/tokenAuthentication";


export default function SavedEvents({setIsLoggedIn}) {
    const [saved, setSaved] = useState<Array<musicEvent>>([]);

    useEffect(() => {
        const getEvents = async () => {
            const user = await userData.get();
            const savedEvents = user.data
                .map((data: { artefact: string; }, index: number) => {
                    return JSON.parse(data.artefact);
                })

            setSaved(savedEvents);
        }
        getEvents().then(r => 'ignored');
    }, []);

    const listOfEvents = saved
        .map((event: musicEvent, index: number) => {
            return <Button
                title={event.name}
                key={index}
            />
        });

    async function doLogout () {
        await tokenAuthentication.logout();
        setIsLoggedIn(false);
    }

    return (
        <ScrollView>
            <Text>EVENEMANG</Text>
            {listOfEvents}
            <Button
                title="Logga ut"
                onPress={() => {
                    doLogout().then(r => 'ignored');
                }}
            />
        </ScrollView>
    );
}
