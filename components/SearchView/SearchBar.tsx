import {TextInput, View, StyleSheet} from "react-native";
import colors from "../../styles/variables/colors";
import {Ionicons} from "@expo/vector-icons";

export default function SearchBar ({searchTerm, setSearchTerm, dimensions}) {
    const styles = StyleSheet.create({
        headerContainer: {
            backgroundColor: colors.blue,
            height: dimensions.screen.height * 0.125,
            paddingTop: dimensions.screen.height * 0.046,
            paddingLeft: dimensions.screen.width * 0.06,
            paddingRight: dimensions.screen.width * 0.06,
            alignItems: 'center'
        },
        searchBar: {
            backgroundColor: colors.bg,
            height: dimensions.screen.height * 0.05,
            width: dimensions.screen.width * 0.8,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center'
        },
        icon: {
            paddingHorizontal: dimensions.screen.width * 0.05
        },
        input: {
            flex: 1,
            backgroundColor: 'transparent'
        }
    })

    return (
        <View style={styles.headerContainer}>
            <View style={styles.searchBar}>
                <Ionicons name="search" size={24} color={colors.text} style={styles.icon}/>
                <TextInput
                    onChangeText={(content: string) => {
                        setSearchTerm(content);
                    }}
                    value={searchTerm}
                    style={styles.input}
                    placeholder="Sök här..."
                />
            </View>
        </View>
        )
}
