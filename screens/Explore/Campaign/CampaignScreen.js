import React from 'react';
import { StyleSheet, Text, ScrollView, ActivityIndicator, View } from 'react-native';

import ObservationScreen from '../Observation/ObservationScreen';
import NavigationTitle from '../../../components/NavigationTitle';
import ObservationImageList from '../../../components/ObservationImageList';
import ViewMore from '../../../components/ViewMore';

const exempleObservationsData = {
    observations:
        [{
            id: 1,
            author: "Reiner",
            taxonomyGroup: "Insect",
            title: "Eyed Lady Bug",
            imageList: [
                "EyedLadyBug1.jpeg",
                "EyedLadyBug2.jpeg",
                "EyedLadyBug3.jpeg"
            ],
            location: (0.0, 0.0),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus id diam non lacinia.Aliquam vitae fermentum ex, in placerat lectus. Sed dictum mi et metus bibendum pellentesque. Quisque eget tortor quis ipsum interdum consequat. Integer sed euismod lacus. Sed id turpis libero. Proin vel erat augue. Pellentesque porta justo sed tempus sodales. Ut vel faucibus ante. Morbi sed commodo felis. Cras ultrices, enim sed fermentum varius, risus est bibendum magna, id semper mauris quam sit amet lorem. Vestibulum aliquam dui eget lorem dignissim, vel facilisis ipsum elementum. Aliquam at ligula eu metus pretium accumsan in gravida ante. Quisque dapibus quam ut suscipit volutpat. Phasellus consectetur gravida sagittis. Curabitur finibus ante justo, non pretium dolor rutrum sed.",
            creationDate: "2023-10-04T12:04:54.977603876"
        }
            ,
        {
            id: 2,
            author: "Srall",
            taxonomyGroup: "Insect",
            title: "Western Honey Bee",
            imageList: [
                "WesternHoneyBee1.jpeg",
                "WesternHoneyBee2.jpeg"
            ],
            location: (100.0, 800.27),
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus id diam non lacinia.Aliquam vitae fermentum ex, in placerat lectus. Sed dictum mi et metus bibendum pellentesque. Quisque eget tortor quis ipsum interdum consequat. Integer sed euismod lacus. Sed id turpis libero. Proin vel erat augue. Pellentesque porta justo sed tempus sodales. Ut vel faucibus ante. Morbi sed commodo felis. Cras ultrices, enim sed fermentum varius, risus est bibendum magna, id semper mauris quam sit amet lorem. Vestibulum aliquam dui eget lorem dignissim, vel facilisis ipsum elementum. Aliquam at ligula eu metus pretium accumsan in gravida ante. Quisque dapibus quam ut suscipit volutpat. Phasellus consectetur gravida sagittis. Curabitur finibus ante justo, non pretium dolor rutrum sed.",
            creationDate: "2000-08-28T12:04:54.977603876"
        }
        ]
}

export default function CampaignScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [observations, setObservations] = React.useState('');
    const [campaign, setCampaign] = React.useState('');

    const fetchObservations = () => {
        fetch('https://path-to-server/observations')
            .then((response) => setObservations(response.json()))
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
            title: <NavigationTitle title={route.params?.campaign.name} />,
        });

        setCampaign(route.params?.campaign);

        setIsLoading(true);
        // fetchObservations();

        setObservations(exempleObservationsData.observations);
        setIsLoading(false);
    }, [])

    const startDate = new Date(campaign.startDate).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "2-digit" });
    const endDate = new Date(campaign.endDate).toLocaleDateString('en-us', { year: "numeric", month: "long", day: "2-digit" });
    const campaignView = (
        <ScrollView style={styles.view}>
            <View style={{
                gap: 20,
            }}>
                {/* // ! this is a placeholder for the map // */}
                <View style={{
                    width: '100vp' - 20,
                    height: 200,
                    backgroundColor: '#fff',
                    borderRadius: 5,
                }} />

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
                    <Text style={styles.title}>Observations ({observations.length})</Text>
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
        marginBottom: 115,
    },
    view: {
        margin: 20,
        marginBottom: 115,
    },
    title: {
        fontSize: 16,
        fontWeight: 600,
        color: '#2E9A99',
    },
})