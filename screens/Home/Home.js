import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

import IconFilter from '../../components/IconFilter/IconFilter';
import SearchBar from '../../components/SearchBar';
import CampaignImageList from '../../components/CampaignImageList';
import NavigationTitle from '../../components/NavigationTitle';
import NoResult from '../../components/NoResult';
import HomeTabView from './HomeTabView';

import { exampleCampaignsData, exampleObservationsData } from '../TemporaryData';

export default function Home({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [myCampaigns, setMyCampaigns] = React.useState([]);
    const [myCampaignsFiltered, setMyCampaignsFiltered] = React.useState([]);
    const [myObservations, setMyObservations] = React.useState([]);
    const [myObservationsFiltered, setMyObservationsFiltered] = React.useState([]);
    const [firstTab, setFirstTab] = React.useState(true);

    const fetchMyCampaigns = () => {
        fetch('http://localhost:8080/campaigns'
        )
            .then(response => response.json())
            .then(json => {
                let response1 = json
                setMyCampaigns(response1);
                setMyCampaignsFiltered(response1);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
            .finally(() => setIsLoading(false));
    }

    const fetchMyObservations = () => {
        fetch("http://localhost:8080/observations")
            .then((response) => {
                let response2 = response.json()
                setMyObservations(response2);
                setMyObservationsFiltered(response2);
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
            headerTitle: () => <NavigationTitle title={"Home"} />,
        });

        setIsLoading(true);
        fetchMyCampaigns();
        fetchMyObservations();

        // TODO remove when fetching works
        /*
        setMyCampaigns(exampleCampaignsData);
        setMyCampaignsFiltered(exampleCampaignsData);
        setMyObservations(exampleObservationsData);
        setMyObservationsFiltered(exampleObservationsData);
        setIsLoading(false);
        */
    }, [])

    const homeView = (
        <View style={{
            gap: 10,
            height: '100%',
            ...styles.view
        }}>
            <SearchBar data={firstTab ? myObservations : myCampaigns} setData={firstTab ? setMyObservationsFiltered : setMyCampaignsFiltered} />
            <HomeTabView setFirstTab={setFirstTab} campaigns={myCampaignsFiltered} observations={myObservationsFiltered} navigation={navigation} route={route} />
        </View>
    )

    return (
        <View style={{ height: '100%', margin: 0 }}>
            {isLoading ?
                (<View style={styles.loading} >
                    <ActivityIndicator size="large" />
                </View>) :
                (error ?
                    // TODO make the error page look nice
                    <Text>Sorry, a problem occured while retrieving your observations. Please try again later.</Text> :
                    homeView
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
    }
})