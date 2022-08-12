import {TextInput, View} from "react-native";

export default function SearchBar ({searchTerm, setSearchTerm}) {
    return (
            <TextInput
                onChangeText={(content: string) => {
                    setSearchTerm(content);
                }}
                value={searchTerm}
            />
        )
}
