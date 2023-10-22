import React from 'react';
import { StyleSheet, ActivityIndicator, View, Text, ScrollView, Image } from 'react-native';

import NavigationTitle from '../../components/NavigationTitle';
import CampaignScreen from './Campaign/CampaignScreen';
import CampaignImageList from '../../components/CampaignImageList';
import SearchBar from '../../components/SearchBar';
import IconFilter from '../../components/IconFilter/IconFilter';
import NoResult from '../../components/NoResult';

const exempleCampaignsData = [{
    id: 1,
    name: "Lady Bug",
    creator: "Bioversity International",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus id diam non lacinia.Aliquam vitae fermentum ex, in placerat lectus. Sed dictum mi et metus bibendum pellentesque. Quisque eget tortor quis ipsum interdum consequat. Integer sed euismod lacus. Sed id turpis libero. Proin vel erat augue. Pellentesque porta justo sed tempus sodales. Ut vel faucibus ante. Morbi sed commodo felis. Cras ultrices, enim sed fermentum varius, risus est bibendum magna, id semper mauris quam sit amet lorem. Vestibulum aliquam dui eget lorem dignissim, vel facilisis ipsum elementum. Aliquam at ligula eu metus pretium accumsan in gravida ante. Quisque dapibus quam ut suscipit volutpat. Phasellus consectetur gravida sagittis. Curabitur finibus ante justo, non pretium dolor rutrum sed.",
    startDate: "2023-10-04T12:04:54.977603876",
    endDate: "2024-10-04T12:04:54.977603876",
    groupsToIdentify: [
        "Insects",
    ],
    area: {
        coordinates: {
            longitude: 48.13,
            lattitude: -1.64
        },
        radius: 0.05
    },
    image: "EyedLadyBug1.jpeg"
},
{
    id: 2,
    name: "Honey Bee",
    creator: "NatureServe",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus id diam non lacinia.Aliquam vitae fermentum ex, in placerat lectus. Sed dictum mi et metus bibendum pellentesque. Quisque eget tortor quis ipsum interdum consequat. Integer sed euismod lacus. Sed id turpis libero. Proin vel erat augue. Pellentesque porta justo sed tempus sodales. Ut vel faucibus ante. Morbi sed commodo felis. Cras ultrices, enim sed fermentum varius, risus est bibendum magna, id semper mauris quam sit amet lorem. Vestibulum aliquam dui eget lorem dignissim, vel facilisis ipsum elementum. Aliquam at ligula eu metus pretium accumsan in gravida ante. Quisque dapibus quam ut suscipit volutpat. Phasellus consectetur gravida sagittis. Curabitur finibus ante justo, non pretium dolor rutrum sed.",
    startDate: "2023-08-01T12:04:54.977603876",
    endDate: "2024-08-01T12:04:54.977603876",
    groupsToIdentify: [
        "Insects",
    ],
    area: {
        coordinates: {
            longitude: -48.13,
            lattitude: 1.64
        },
        radius: 0.1
    },
    image: "WesternHoneyBee1.jpeg"
},
{
    id: 3,
    name: "Wild Flowers",
    creator: "Wildlife Conservation Society",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque faucibus id diam non lacinia.Aliquam vitae fermentum ex, in placerat lectus. Sed dictum mi et metus bibendum pellentesque. Quisque eget tortor quis ipsum interdum consequat. Integer sed euismod lacus. Sed id turpis libero. Proin vel erat augue. Pellentesque porta justo sed tempus sodales. Ut vel faucibus ante. Morbi sed commodo felis. Cras ultrices, enim sed fermentum varius, risus est bibendum magna, id semper mauris quam sit amet lorem. Vestibulum aliquam dui eget lorem dignissim, vel facilisis ipsum elementum. Aliquam at ligula eu metus pretium accumsan in gravida ante. Quisque dapibus quam ut suscipit volutpat. Phasellus consectetur gravida sagittis. Curabitur finibus ante justo, non pretium dolor rutrum sed.",
    startDate: "2023-08-01T12:04:54.977603876",
    endDate: "2024-08-01T12:04:54.977603876",
    groupsToIdentify: [
        "Plants",
    ],
    area: {
        coordinates: {
            longitude: -48.13,
            lattitude: 1.64
        },
        radius: 0.1
    },
    image: "WildFlowers1.jpg"
}]

export default function ExploreScreen({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [campaigns, setCampaigns] = React.useState([]);
    const [iconFilteredCampaign, setIconFilteredCampaigns] = React.useState([]);
    const [inputFilteredCampaign, setInputFilteredCampaigns] = React.useState([]);
    const [filteredCampaigns, setFilteredCampaigns] = React.useState([]);

    navigation.setOptions({
        title: <NavigationTitle title={"Exploring All Campaigns"} />,
    });

    const fetchCampaigns = () => {
        fetch('https://path-to-server/campaigns')
            .then((response) => {
                setCampaigns(response.json());
                setFilteredCampaigns(response.json());
                setIconFilteredCampaigns(response.json());
                setInputFilteredCampaigns(response.json());
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
        
        setIsLoading(true);
        // fetchCampaigns();

        // TODO remove when fetching works
        setCampaigns(exempleCampaignsData);
        setFilteredCampaigns(exempleCampaignsData);
        setIconFilteredCampaigns(exempleCampaignsData);
        setInputFilteredCampaigns(exempleCampaignsData);
        setIsLoading(false);
    }, [])

    React.useEffect(() => {
        setFilteredCampaigns(inputFilteredCampaign?.filter(value => iconFilteredCampaign.includes(value)));
    }, [inputFilteredCampaign, iconFilteredCampaign])

    const exploreAllView = (
        <ScrollView style={styles.view}>
            <View style={{
                gap: 10,
                width: '100%',
                height: '100%',
            }}>
                <SearchBar data={campaigns} setData={setInputFilteredCampaigns} />
                <IconFilter data={campaigns} setData={setIconFilteredCampaigns} />
                {filteredCampaigns.length ?
                    <CampaignImageList campaigns={filteredCampaigns} navigation={navigation} route={route}></CampaignImageList> :
                    <NoResult message='Campaigns'/>
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
                    // TODO make the error page look nice
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
        marginBottom: 115,
    },
    view: {
        margin: 20,
        marginBottom: 115,
    }
})