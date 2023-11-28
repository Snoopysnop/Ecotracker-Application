import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function NavigationTitle({ title, author }) {
    authorr = author;
    return (
        <View style={{
            alignItems: author ? 'baseline' : 'center',
            ...styles.container
        }}>
            <Text style={styles.navTitle}>{title}</Text>
            {author && <Text style={styles.author}>by {author}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    navTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2E9A99',
    },
    author: {
        fontSize: 15,
        fontStyle: 'italic',
        marginLeft: 7,
        color: '#2E9A99',
    }
})