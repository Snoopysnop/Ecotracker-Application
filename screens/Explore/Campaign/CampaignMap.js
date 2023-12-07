import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path, Ellipse } from 'react-native-svg'

import MapView from 'react-native-maps';
import { Circle, Marker } from 'react-native-maps';

const MAP_SCALE = 37500;

export default function CampaignMap({ area, observations, navigation, route }) {
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
                {observations.map((observation, index) => (
                    <View key={index}>
                        <Marker
                            coordinate={{
                                latitude: observation.location.latitude,
                                longitude: observation.location.longitude,
                            }}
                            title={observation.title}
                            description={observation.author}
                            onCalloutPress={() => navigation.navigate('Observation', {
                                observationData: observation,
                                navigation: navigation,
                                route: route,
                                id: index,
                            })}
                        >
                            <Svg
                                height={10}
                                width={10}
                            >
                                <Ellipse
                                    cx="5"
                                    cy="5"
                                    rx="5"
                                    ry="5"
                                    fill="#2E9A99"
                                />
                            </Svg>
                        </Marker>
                    </View>
                ))}
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