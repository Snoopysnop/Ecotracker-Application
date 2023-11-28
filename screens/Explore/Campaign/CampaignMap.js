import React from 'react';
import { StyleSheet, View } from 'react-native';

import MapView from 'react-native-maps';
import { Circle } from 'react-native-maps';

const MAP_SCALE = 37500;

export default function CampaignMap({ area }) {
    return (
        <View style={{
            width: '100%',
            height: 200,
            backgroundColor: '#fff',
            borderRadius: 5,
            padding: 5,
        }}>
            <MapView
                style={{
                    width: '100%',
                    height: '100%',
                }}
                initialRegion={{
                    latitude: area.coordinates.latitude,
                    longitude: area.coordinates.longitude,
                    latitudeDelta: (area.radius / MAP_SCALE),
                    longitudeDelta: (area.radius / MAP_SCALE),
                }}
            >
                <Circle
                    center={{
                        latitude: area.coordinates.latitude,
                        longitude: area.coordinates.longitude,
                    }}
                    radius={area.radius}
                    strokeWidth={2}
                    strokeColor="#2E9A99"
                    fillColor="rgba(46, 154, 152, 0.2)"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        margin: 20,
        marginBottom: 100,
    },
})