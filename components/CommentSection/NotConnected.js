import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function NotConnected() {
    return (
        <View
            style={{
                backgroundColor: '#E1E8E8',
                ...styles.container
            }}
        >
            <Text style={styles.subtitle}>
                Log In or Sign Up to leave a comment.
            </Text>

            <TouchableOpacity onPress={() => console.log("TODO handle log in")}>
                <Text style={{
                    color: '#2E9A99',
                    borderColor: '#2E9A99',
                    alignContent: 'flex-end',
                    borderRadius: 8,
                    borderWidth: 2,
                    ...styles.button
                }}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("TODO handle sign up")}>
                <Text style={{
                    color: '#fff',
                    backgroundColor: '#2E9A99',
                    alignSelf: 'flex-end',
                    ...styles.button
                }}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        gap: 10,
        alignItems: 'center',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        fontWeight: '600',
    },
    subtitle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: '200',
        color: 'grey',
        fontStyle: 'italic',
        maxWidth: 250,
    },
})