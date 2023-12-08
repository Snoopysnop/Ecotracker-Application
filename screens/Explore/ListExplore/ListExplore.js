import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text, ScrollView, Image } from 'react-native';

import NavigationTitle from '../../../components/NavigationTitle';
import CampaignImageList from '../../../components/CampaignImageList';
import SearchBar from '../../../components/SearchBar';
import IconFilter from '../../../components/IconFilter/IconFilter';
import NoResult from '../../../components/NoResult';

import { ipAddress } from '../../../config';


export default function ListExplore({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [campaigns, setCampaigns] = React.useState([]);
    const [iconFilteredCampaign, setIconFilteredCampaigns] = React.useState([]);
    const [inputFilteredCampaign, setInputFilteredCampaigns] = React.useState([]);
    const [filteredCampaigns, setFilteredCampaigns] = React.useState([]);

    const fetchCampaigns = () => {
        fetch('http://' + ipAddress + ':8080/campaigns')
            .then(response => response.json())
            .then(json => {
                setCampaigns(json);
                setFilteredCampaigns(json);
                setIconFilteredCampaigns(json);
                setInputFilteredCampaigns(json);
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
            headerTitle: () => <NavigationTitle title={"Exploring All Campaigns"} />,
        });

        setIsLoading(true);
        fetchCampaigns();
    }, [])

    React.useEffect(() => {
        setFilteredCampaigns(inputFilteredCampaign?.filter(value => iconFilteredCampaign.includes(value)));
    }, [inputFilteredCampaign, iconFilteredCampaign])

    const exploreAllView = (
        <ScrollView style={{
            margin: 20,
        }} showsVerticalScrollIndicator={false}>
            <View style={{
                gap: 10,
                width: '100%',
                height: '100%',
                ...styles.view
            }}>
                <SearchBar data={campaigns} setData={setInputFilteredCampaigns} />
                <IconFilter data={campaigns} setData={setIconFilteredCampaigns} />
                {filteredCampaigns?.length ?
                    <CampaignImageList campaigns={filteredCampaigns} navigation={navigation} route={route}></CampaignImageList> :
                    <NoResult message='Campaigns' />
                }
            </View>
        </ScrollView >
    )

    return (
        <View style={{ height: '100%', margin: 0 }}>
            {isLoading ?
                (<View style={styles.loading} >
                    <ActivityIndicator size="large" />
                </View>) :
                (error ?
                    <Text>Sorry, a problem occured while retrieving campaigns. Please try again later.</Text> :
                    exploreAllView
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
        marginBottom: 200,
    }
})