import React from 'react';
import { View, Text, StyleSheet, PermissionsAndroid } from 'react-native';

import NavigationTitle from '../../../components/NavigationTitle';
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

import { exampleCampaignsData } from '../../TemporaryData';

export default function MapExplore({ navigationParent, navigation, route, campaigns }) {
    const [location, setLocation] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    campaigns = exampleCampaignsData; // TODO remove

    React.useEffect(() => {
        route.params?.navigationParent.setOptions({
            headerShown: false,
        });

        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Explore All Campaigns"} />,
        });
    })

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation({
                    latitude : campaigns[0].area.coordinates.latitude,
                    longitude : campaigns[0].area.coordinates.longitude,
                });
                setIsLoading(false);
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude : userLocation.coords.latitude,
                longitude : userLocation.coords.longitude,
            });
            setIsLoading(false);
        })();
    })

    return (
        <View style={styles.view}>
            {!isLoading &&
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.04,
                        longitudeDelta: 0.04,
                    }}
                    followsUserLocation={true}
                    region={location}
                >
                    {campaigns.map((campaign, index) => (
                        <View key={index}>
                            <Marker
                                coordinate={{
                                    latitude: campaign.area.coordinates.latitude,
                                    longitude: campaign.area.coordinates.longitude,
                                }}
                                title={campaign.title}
                                description={campaign.author}
                                onCalloutPress={() => navigation.navigate('Campaign', {
                                    campaign: campaign,
                                    navigation: navigation,
                                    route: route,
                                    ID: campaign.id,
                                })}
                            />
                            <Circle
                                center={{
                                    latitude: campaign.area.coordinates.latitude,
                                    longitude: campaign.area.coordinates.longitude,
                                }}
                                radius={campaign.area.radius}
                                strokeWidth={2}
                                strokeColor="#2E9A99"
                                fillColor="rgba(46, 154, 152, 0.2)"
                            />
                        </View>
                    ))}
                </MapView>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        // TODO remove if not needed anymore
        // margin: 20,
        // marginBottom: 100,
    }
})