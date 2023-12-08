import React from 'react';
import { StyleSheet, Text, ScrollView, ActivityIndicator, View } from 'react-native';

import NavigationTitle from '../../../components/NavigationTitle';
import ObservationImageList from '../../../components/ObservationImageList';
import ViewMore from '../../../components/ViewMore';
import CampaignMap from './CampaignMap';

import { ipAddress } from '../../../config';


export default function Campaign({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [observations, setObservations] = React.useState([]);
    const [campaign, setCampaign] = React.useState('');

    const fetchObservations = () => {
        fetch('http://' + ipAddress + ':8080/campaign/' + route.params?.ID + '/observations')
            .then(response => response.json())
            .then(json => setObservations(json))
            .catch((error) => {
                console.error(error);
                setObservations([]);
                setError(true);
            })
            .finally(() => setIsLoading(false));
    }

    React.useEffect(() => {
        route.params?.navigationParent.setOptions({
            headerShown: false,
        });

        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={route.params?.campaign.title} />,
        });

        setIsLoading(true);
        fetchObservations();

        setCampaign(route.params?.campaign);
    }, [])

    const startDate = new Date(campaign.startDate).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "2-digit" });
    const endDate = new Date(campaign.endDate).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "2-digit" });
    const campaignView = (
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
            <View style={{
                gap: 20,
            }}>
                {campaign.area && <CampaignMap area={campaign.area} observations={observations} navigation={navigation} route={route} />}

                <View>
                    <Text style={styles.title}>Description</Text>
                    <ViewMore description={campaign.description}></ViewMore>
                </View>

                <View>
                    <Text style={styles.title}>Details</Text>
                    <Text>Date: {startDate} - {endDate}</Text>
                    <Text>Group: {campaign.groupsToIdentify?.join(', ')}</Text>
                </View>

                <View>
                    <Text style={{ marginBottom: 10, ...styles.title }}>Observations ({observations.length})</Text>
                    <ObservationImageList observations={observations} navigation={navigation} route={route}></ObservationImageList>
                </View>
            </View>
        </ScrollView>
    )

    return (
        <View style={{ height: '100%', margin: 0 }}>
            {isLoading ?
                (<View style={styles.loading} >
                    <ActivityIndicator size="large" />
                </View>) :
                (error ?
                    <Text>Sorry, a problem occured while retrieving observations. Please try again later.</Text> :
                    campaignView
                )
            }
        </View >
    );
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        margin: 20,
        marginBottom: 100,
    },
    view: {
        margin: 20,
        marginBottom: 100,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2E9A99',
    },
})