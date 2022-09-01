import {Pressable} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {userData} from "../models/userData";
import {useEffect, useState} from "react";

export default function HeaderPressableHeart({event, heartColor}) {
    const [index, setIndex] = useState(-1);
    const includes = () => index > -1;

    const refresh = () => {
        userData.includes(event).then(r => setIndex(r));
    }

    useEffect(() => {
        refresh();
    }, []);

    const add = async () => {
        await userData.add(event);
        setIndex(1);
    }

    const remove = async () => {
        const index = await userData.includes(event);
        await userData.remove(index);
        setIndex(-1);
    }

    return (
        <Pressable
            onPress={() => {
                if (!includes()) {
                    add().then(r => 'ignored');
                    refresh();
                } else {
                    remove().then(r => 'ignored');
                    refresh();
                }
            }}
        >
            {includes() ? <Ionicons name="md-heart" size={24} color={heartColor} style={{padding: 10}}/> : <Ionicons name="md-heart-outline" size={24} color={heartColor} style={{padding: 10}}/>}

        </Pressable>
    )
}
