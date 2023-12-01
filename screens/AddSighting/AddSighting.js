import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import NavigationTitle from '../../components/NavigationTitle';
import DropdownSelect from '../../components/DropdownSelect';
import ModalMap from './ModalMap';

import { exampleCampaignsData, exampleObservationsData } from '../TemporaryData';
import ImagesPicker from '../../components/ImagesPicker';

export default function AddSighting({ navigation, route }) {
    const [images, setImages] = React.useState([]);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [date, setDate] = useState(new Date());
    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [modalMapVisible, setModalMapVisible] = useState(false);

    const [campaigns, setCampaigns] = React.useState([]);
    const [campaign, setCampaign] = useState();
    const [category, setCategory] = useState("");

    const [error, setError] = React.useState(false);

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: (e, date) => setDate(new Date(date)),
            mode: currentMode,
            is24Hour: true,
            display: "spinner",
        });
    };

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

        fetch('http://192.168.1.27:8080/create-observation', requestOptions)
            .then(response => {
                navigation.navigate('SigthingAdded', {
                    creation: (response.status % 100 == 2),
                    navigation: navigation,
                });

            })
            .catch((error) => {
                console.error(error);
                navigation.navigate('SigthingAdded', {
                    creation: false,
                    navigation: navigation,
                });
            })
    }

    const fetchCampaigns = () => {
        fetch('http://192.168.1.27:8080/campaigns')
            .then(response => response.json())
            .then(json => setCampaigns(json))
            .catch((error) => {
                console.error(error);
            })
    }

    useFocusEffect(
        React.useCallback(() => {
            const unsubscribe = navigation.addListener('tabPress', (e) => {
                // Prevent default behavior
                e.preventDefault();

                if (images.length == 0
                    || title == "" || description == ""
                    || (location.latitude == 0 && location.longitude == 0)
                    || !campaign || category == "") {
                    Alert.alert('Missing Fields', 'Observation could not be created. Please make sure all the fields are correctly filled.');
                }
                else postObservation();
            });

            return unsubscribe;
        }, [navigation])
    );

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Add Sigthing"} />,
        });

        fetchCampaigns();
    })

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                if (location.latitude == 0 && location.longitude == 0)
                    setLocation({
                        latitude: campaigns[0].area.coordinates.latitude,
                        longitude: campaigns[0].area.coordinates.longitude,
                    });
                return;
            }

            let userLocation = await Location.getCurrentPositionAsync({});
            if (location.latitude == 0 && location.longitude == 0)
                setLocation({
                    latitude: userLocation.coords.latitude,
                    longitude: userLocation.coords.longitude,
                });
        })();
    })

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.view}>
                {/* select images */}
                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Image</Text>
                        <ImagesPicker images={images} setImages={setImages} />
                    </View>
                </View>

                {/* select title + description */}
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

                {/* select date + address */}
                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Date</Text>
                        <TouchableOpacity
                            onPress={() => showMode('date')}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder='November 30, 2023'
                                placeholderTextColor='#ccc'
                                value={date.toLocaleDateString('en-us', { year: "numeric", month: "long", day: "2-digit" })}
                                editable={false}
                                color='#000'
                            />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Text style={{ marginBottom: 5 }}>Location</Text>
                        <TouchableOpacity
                            onPress={() => setModalMapVisible(true)}
                        >
                            <TextInput
                                placeholder="ex: 48.130195, -1.650862"
                                placeholderTextColor='#ccc'
                                style={styles.input}
                                value={location.latitude.toString().substring(0, 9) + ", " + location.longitude.toString().substring(0, 9)}
                                editable={false}
                                color='#000'
                            />
                        </TouchableOpacity>
                        <ModalMap
                            modalMapVisible={modalMapVisible}
                            setModalMapVisible={setModalMapVisible}
                            location={location}
                            setLocation={setLocation}
                        />
                    </View>

                </View>

                {/* select campaign + category */}
                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Campaign</Text>
                        <DropdownSelect
                            title='campaign'
                            data={campaigns.map(c => c.name)}
                            selected={campaign}
                            setSelected={(campaignTitle) => {
                                setCampaign(campaigns.find(c => {
                                    return c.name === campaignTitle
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