import React from 'react';
import { StyleSheet, Text, ScrollView, ActivityIndicator, View } from 'react-native';

import Observation from '../Observation/Observation';
import NavigationTitle from '../../../components/NavigationTitle';
import ObservationImageList from '../../../components/ObservationImageList';
import ViewMore from '../../../components/ViewMore';
import MapView from 'react-native-maps';

import { exampleObservationsData } from '../../TemporaryData';
import CampaignMap from './CampaignMap';

export default function Campaign({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [observations, setObservations] = React.useState([]);
    const [campaign, setCampaign] = React.useState('');

    const fetchObservations = () => {
        fetch('http://localhost:8080/observations')
            .then(response => {
                console.log("response");
                console.log(response);
                response.json();
            })
            .then(json => {
                console.log("json");
                console.log(json);
                setObservations(json);
            })
            .catch((error) => {
                console.log("bouloute");
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
            headerTitle: () => <NavigationTitle title={route.params?.campaign.title} />,
        });

        setIsLoading(true);

        // fetchObservations();

        setCampaign(route.params?.campaign);

        // TODO remove when fetching works
        setObservations(exampleObservationsData);
        setIsLoading(false);
    }, [])

    const startDate = new Date(campaign.startDate).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "2-digit" });
    const endDate = new Date(campaign.endDate).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "2-digit" });
    const campaignView = (
        <ScrollView style={styles.view} showsVerticalScrollIndicator={false}>
            <View style={{
                gap: 20,
            }}>
                {campaign.area && <CampaignMap area={campaign.area}/>}
                
                <View>
                    <Text style={styles.title}>Description</Text>
                    <ViewMore description={campaign.description}></ViewMore>
                </View>

                <View>
                    <Text style={styles.title}>Details</Text>
                    <Text>Date: {startDate} - {endDate}</Text>
                    <Text>Group: {campaign.groupsToIdentify}</Text>
                </View>

                <View>
                    <Text style={{marginBottom:10, ...styles.title}}>Observations ({observations.length})</Text>
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
                    // TODO make the error page look nice
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