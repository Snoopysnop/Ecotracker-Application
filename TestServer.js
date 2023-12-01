import React from 'react';
import { Text, View } from 'react-native';

import CampaignImageList from './components/CampaignImageList';

export default function TestServer() {
    const [campaigns, setCampaigns] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchCampaigns = () => {
        fetch('http://localhost:8080/campaigns')
            .then(response => response.json())
            .then(json => {
                setCampaigns(json);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setIsLoading(false));
    }

    React.useEffect(() => {
        setIsLoading(true);
        fetchCampaigns();
    }, [])

    return (
        <View style={{ width: '100%', height: '100%' }}>
            <Text>Campaigns</Text>
            <CampaignImageList campaigns={campaigns} />
        </View>
    );
}