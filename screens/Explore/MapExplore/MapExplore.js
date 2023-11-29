import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import NavigationTitle from '../../../components/NavigationTitle';
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';

import { exampleCampaignsData } from '../../TemporaryData';

export default function MapExplore({ navigationParent, navigation, route, campaigns }) {
    const [location, setLocation] = React.useState('');

    campaigns = exampleCampaignsData; // TODO remove

    React.useEffect(() => {
        route.params?.navigationParent.setOptions({
            headerShown: false,
        });

        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Explore All Campaigns"} />,
        });
    })

    return (
        <View style={styles.view}>
            <MapView
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                    latitude: 48.130195, // TODO use user's position
                    longitude: -1.650862, // TODO use user's position
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,
                }}
            >
                {campaigns.map((campaign, index) => (
                    <>
                        <Marker
                            key={"marker" + index}
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
                            key={"circle" + index}
                            center={{
                                latitude: campaign.area.coordinates.latitude,
                                longitude: campaign.area.coordinates.longitude,
                            }}
                            radius={campaign.area.radius}
                            strokeWidth={2}
                            strokeColor="#2E9A99"
                            fillColor="rgba(46, 154, 152, 0.2)"
                        />
                    </>
                ))}
            </MapView>
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