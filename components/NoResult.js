import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text, ScrollView, Image } from 'react-native';

export default function NoResult({ message }) {
    return (
        <View style={styles.view}>
            <Image style={styles.image} 
            source={require('../assets/icons/menuIcons/binoculars.png')} 
            />
            <Text style={styles.title}>No {message} Yet</Text>
            <Text style={styles.subtitle}>Better luck nest time</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: '100%',
    },
    image: {
        height: 70,
        width: 70,
        alignSelf: 'center',
    },
    title: {
        textAlign: 'center',
        fontWeight: 600,
    },
    subtitle: {
        textAlign: 'center',
        fontWeight: 200,
        color: '#aaa',
        fontStyle: 'italic',
    },
})