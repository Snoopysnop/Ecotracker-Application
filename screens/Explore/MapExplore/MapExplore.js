import React from 'react';
import { View } from 'react-native';

import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

import NavigationTitle from '../../../components/NavigationTitle';

import { ipAddress } from '../../../config';


export default function MapExplore({ navigation, route }) {
    const [error, setError] = React.useState(false);
    const [location, setLocation] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [campaigns, setCampaigns] = React.useState([]);

    const fetchCampaigns = () => {
        fetch('http://' + ipAddress + ':8080/campaigns')
            .then(response => response.json())
            .then(json => {
                setCampaigns(json);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
            .finally(() => setIsLoading(false));
    }

    React.useEffect(() => {
        route.params?.navigationParent.setOptions({
            headerShown: false,
        });

        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Explore All Campaigns"} />,
        });

        setIsLoading(true);
        fetchCampaigns();
    }, [])

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setLocation({
                    latitude: campaigns[0].area.coordinates.latitude,
                    longitude: campaigns[0].area.coordinates.longitude,
                });
                setIsLoading(false);
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
            });
            setIsLoading(false);
        })();
    }, [])

    return (
        <View>
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
                                description={campaign.organization_name}
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