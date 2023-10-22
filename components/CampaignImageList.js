import React from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

export default function CampaignImageList({ navigation, campaigns, route }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#f6f6f6', width: '100%' }}>
            {campaigns.map((campaign, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 75 }}
                        onPress={() => navigation.navigate('CampaignScreen', {
                            campaign: campaign,
                            navigation: navigation,
                            route: route,
                            ID: campaign.id,
                        })}
                    >

                        <View style={[styles.centerElement, { width: 75 }]}>
                            <Image
                                source={require("../assets/" + campaign.image)}
                                style={styles.image}
                            />
                        </View>

                        <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 15 }}>{campaign.name}</Text>
                            <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{campaign.creator}</Text>
                        </View>

                        <View style={[styles.centerElement, { marginRight: 20 }]}>
                            <Text>{new Date(campaign.endDate).toLocaleDateString()}</Text>
                        </View>

                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    centerElement: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 50,
        width: 50
    },
});