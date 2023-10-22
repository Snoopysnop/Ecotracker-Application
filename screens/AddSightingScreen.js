import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';

import NavigationTitle from '../components/NavigationTitle';
import DropdownSelect from '../components/DropdownSelect';

export default function AddSightingScreen({ navigation, route }) {
    React.useEffect(() => {
        navigation.setOptions({
            title: <NavigationTitle title={"Add Sigthing"} />,
        });
    })

    return (
        <ScrollView>
            <View style={styles.view}>
                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Title</Text>
                        <TextInput
                            placeholder="ex: Short Lawn Daisy"
                            placeholderTextColor='#ccc'
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Description</Text>
                        <TextInput
                            placeholder="enter a description..."
                            placeholderTextColor='#ccc'
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={7}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Adress</Text>
                        <TextInput
                            placeholder="ex: 123 Lane Park, 12345 LONDON"
                            placeholderTextColor='#ccc'
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Category</Text>
                        <DropdownSelect></DropdownSelect>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    view: {
        marginBottom: 115,
        gap: 20,
        height: '100%',
    },
    input: {
        width: '100%',
        outlineStyle: 'none',
        borderColor: "#ccc",
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        gap: 20,
    }
})