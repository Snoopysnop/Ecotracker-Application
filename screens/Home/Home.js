import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';

import SearchBar from '../../components/SearchBar';
import NavigationTitle from '../../components/NavigationTitle';
import HomeTabView from './HomeTabView';

import { ipAddress } from '../../config';


export default function Home({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [myCampaigns, setMyCampaigns] = React.useState([]);
    const [myCampaignsFiltered, setMyCampaignsFiltered] = React.useState([]);
    const [myObservations, setMyObservations] = React.useState([]);
    const [myObservationsFiltered, setMyObservationsFiltered] = React.useState([]);
    const [firstTab, setFirstTab] = React.useState(true);

    const fetchMyCampaigns = () => {
        console.log(route.params?.user);
        fetch('http://' + ipAddress + ':8080/user/' + route.params?.user + '/campaigns')
            .then(response => response.json())
            .then(json => {
                setMyCampaigns(json);
                setMyCampaignsFiltered(json);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
            .finally(() => setIsLoading(false));
    }

    const fetchMyObservations = () => {
        fetch('http://' + ipAddress + ':8080/user/' + route.params?.user + '/observations')
            .then((response) => response.json())
            .then((json) => {
                setMyObservations(json);
                setMyObservationsFiltered(json);
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