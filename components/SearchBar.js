import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';

export default function SearchBar({ data, setData }) {
    const [search, setSearch] = React.useState('');

    const handleSearch = (input) => {
        setSearch(input);
        setData(input == '' ? data : data.filter(element => element.title.toUpperCase().includes(input.toUpperCase())));
    }

    return (
        <View style={styles.searchBarContainer}>
            <TextInput
                placeholder="Search..."
                placeholderTextColor='#ccc'
                onChangeText={handleSearch}
                value={search}
                style={styles.searchBar}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <TouchableOpacity
                style={styles.closeButtonParent}
                onPress={() => handleSearch('')}
            >
                <Image
                    style={styles.closeButton}
                    source={require("../assets/icons/close.png")}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    searchBarContainer: {
        borderColor: "#ccc",
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
    },
    searchBar: {
        width: '100%',
        height: '100%',
        paddingLeft: 20,
        paddingRight: 35,
        paddingVertical: 10,
    },
    closeButton: {
        height: 20,
        width: 20,
        marginRight: 10,
        position: 'relative',
        right: 30,
    },
    closeButtonParent: {
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5,
    },
})