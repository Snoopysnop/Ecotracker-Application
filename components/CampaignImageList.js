import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function CampaignImageList({ navigation, campaigns, route }) {
    let byte = '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhYYGRgaHBwaHBwcHBgYGhoYHBgcGRoaHBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQsJSw0NDQ0NDQ0NDQ0NDY0NDQ0NDQ0NDQ0NDQ0NDQ2NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAO4A1AMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAACAwEEAAUGBwj/xAA5EAABAwIEBAQEBQQCAgMAAAABAAIRAyEEEjFBBVFhcSKBkaEGE7HwMkLB0eEHFFLx';
    return (
        <View style={{ flex: 1, backgroundColor: '#f6f6f6', width: '100%' }}>
            {campaigns.map((campaign, index) => {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{ flexDirection: 'row', backgroundColor: '#fff', marginBottom: 2, height: 75 }}
                        onPress={() => navigation.navigate('Campaign', {
                            campaign: campaign,
                            navigation: navigation,
                            route: route,
                            ID: campaign.id,
                        })}
                    >

                        <View style={[styles.centerElement, { width: 75 }]}>
                            <Image
                                source={{ uri: `data:image/png;base64,${campaign.image}`}}
                                style={styles.image}
                            />
                        </View>

                        <View style={{ flexGrow: 1, flexShrink: 1, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 15 }}>{campaign.title}</Text>
                            <Text numberOfLines={1} style={{ color: '#8f8f8f' }}>{campaign.organization_name}</Text>
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