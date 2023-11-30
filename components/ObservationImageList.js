import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, Image } from 'react-native';

export default function ObservationImageList({ navigation, observations, route }) {
    return (
        <View style={{ marginTop:10, flex: 1, backgroundColor: '#f6f6f6', width: '100%' }}>
            {observations.map((observation, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 80 }}
                        onPress={() => navigation.navigate('Observation', {
                            observationData: observation,
                            navigation: navigation,
                            route: route,
                            ID: 0,
                        })}
                    >

                        <View style={[styles.centerElement, { width: 75 }]}>
                            <Image
                                // source={require("../assets/" + observation.imageList[0])}
                                style={styles.image}
                            />
                        </View>

                        <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 15 }}>{observation.title}</Text>
                            <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{observation.author}</Text>
                        </View>

                        <View style={[styles.centerElement, { marginRight: 20 }]}>
                            <Text>{new Date(observation.creationDate).toLocaleDateString()}</Text>
                        </View>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    centerElement: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50
    },
});