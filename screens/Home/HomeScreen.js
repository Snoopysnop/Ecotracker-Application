import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

import IconFilter from '../../components/IconFilter/IconFilter';
import SearchBar from '../../components/SearchBar';
import CampaignImageList from '../../components/CampaignImageList';
import NavigationTitle from '../../components/NavigationTitle';
import NoResult from '../../components/NoResult';
import HomeTabView from './HomeTabView';

export default function HomeScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [myCampaigns, setMyCampaigns] = React.useState([]);
    const [myCampaignsFiltered, setMyCampaignsFiltered] = React.useState([]);
    const [myObservations, setMyObservations] = React.useState([]);
    const [myObservationsFiltered, setMyObservationsFiltered] = React.useState([]);
    const [firstTab, setFirstTab,] = React.useState(true);

    const fetchMyCampaigns = () => {
        fetch('https://path-to-server/campaigns')
            .then((response) => {
                setMyCampaigns(response.json());
                setMyCampaignsFiltered(response.json());
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
            .finally(() => setIsLoading(false));
    }

    const fetchMyObservations = () => {
        fetch('https://path-to-server/observations')
            .then((response) => {
                setMyObservations(response.json());
                setMyObservationsFiltered(response.json());
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
            .finally(() => setIsLoading(false));
    }

    React.useEffect(() => {
        navigation.setOptions({
            title: <NavigationTitle title={"Home"} />,
        });
        
        setIsLoading(true);
        // fetchMyCampaigns();
        // fetchMyObservations();

        // TODO remove when fetching works
        setMyCampaigns([]);
        setMyCampaignsFiltered([]);
        setIsLoading(false);
    }, [])

    const homeView = (
        <View style={{
            gap: 10,
            ...styles.view
        }}>
            <SearchBar data={firstTab ? myCampaigns : myObservations} setData={firstTab ? setMyCampaignsFiltered : setMyObservationsFiltered} />
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
        marginBottom: 115,
    },
    view: {
        margin: 20,
        marginBottom: 115,
    }
})