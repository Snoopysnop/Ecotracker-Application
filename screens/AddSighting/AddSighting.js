import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import NavigationTitle from '../../components/NavigationTitle';
import DropdownSelect from '../../components/DropdownSelect';

import { exampleCampaignsData, exampleObservationsData } from '../TemporaryData';
import CustomDatePicker from '../../components/DatePicker';
// import CustomImagePicker from '../../components/ImagePicker';

export default function AddSighting({ navigation, route }) {
    const [address, setAddress] = useState("");
    const [campaign, setCampaign] = useState();
    const [category, setCategory] = useState("");
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState((0.0, 0.0));
    const [title, setTitle] = useState("");

    const [campaigns, setCampaigns] = React.useState([]);

    const postObservation = () => {
        // TODO send images, update author, retrieve localisation
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                taxonomyGroup: category,
                title: title,
                description: description,
                creationDate: date
            })
        };

        fetch('http://localhost:8080/create-observation', requestOptions)
            .then(response => {
                navigation.navigate('SigthingCreation', {
                    creation: (response.status % 100 == 2),
                    navigation: navigation,
                });

            })
            .catch((error) => {
                console.error(error);
                navigation.navigate('SigthingCreation', {
                    creation: false,
                    navigation: navigation,
                });
            })
    }

    const fetchCampaigns = () => {
        fetch('http://localhost:8080/campaigns'
        )
            .then(response => response.json())
            .then(json => {
                setCampaigns(json);
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            })
    }

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('tabPress', (e) => {
                // Prevent default behavior
                e.preventDefault();

                // TODO remove later
                postObservation();
            });

            return unsubscribe;
        }, [navigation])
    );

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Add Sigthing"} />,
        });

        // fetchCampaigns();

        // TODO remove when fetching works
        setCampaigns(exampleCampaignsData);
    })

    return (
        <ScrollView>
            <View style={styles.view}>
                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Image</Text>
                        {/* <CustomImagePicker/> */}
                    </View>
                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Title</Text>
                        <TextInput
                            placeholder="ex: Short Lawn Daisy"
                            placeholderTextColor='#ccc'
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={setTitle}
                            value={title}
                        />
                    </View>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Description</Text>
                        <TextInput
                            placeholder="enter a description..."
                            placeholderTextColor='#ccc'
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            multiline={true}
                            numberOfLines={7}
                            onChangeText={setDescription}
                            value={description}
                            textAlignVertical='top'
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Date</Text>
                        <CustomDatePicker
                            date={date}
                            setDate={setDate}
                        />
                    </View>

                    <View>
                        <Text style={{ marginBottom: 5 }}>Adress</Text>
                        <TextInput
                            placeholder="ex: 123 Lane Park, 12345 LONDON"
                            placeholderTextColor='#ccc'
                            style={styles.input}
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={setAddress}
                            value={address}
                        />
                    </View>

                </View>

                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Campaign</Text>
                        <DropdownSelect
                            title='campaign'
                            data={campaigns.map(c => c.title)}
                            selected={campaign}
                            setSelected={(campaignTitle) => {
                                setCampaign(campaigns.find(c => {
                                    return c.title === campaignTitle
                                }))
                            }}
                        />
                    </View>

                    <View>
                        <Text style={{ marginBottom: 5 }}>Category</Text>
                        <DropdownSelect
                            title='category'
                            data={campaign === undefined ? [] : campaign.groupsToIdentify}
                            selected={category}
                            setSelected={setCategory}
                        />
                    </View>
                </View>
            </View >
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    view: {
        marginBottom: 100,
        gap: 20,
        height: '100%',
    },
    visibleView: {
        disable: 'true',
    },
    input: {
        width: '100%',
        borderColor: "#ccc",
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    container: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        gap: 20,
    },
    datePickerStyle: {
        width: '100%',
    }
})