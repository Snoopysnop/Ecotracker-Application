import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { auth } from '../../firebase'
import DropdownSelect from '../../components/DropdownSelect';
import ImagesPicker from '../../components/ImagesPicker/ImagesPicker';
import ModalMap from './ModalMap';
import NavigationTitle from '../../components/NavigationTitle';

import { ipAddress } from '../../config';


export default function AddSighting({ navigation, route }) {
    const [images, setImages] = React.useState([]);

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");

    const [date, setDate] = React.useState(new Date());
    const [location, setLocation] = React.useState({
        latitude: 0,
        longitude: 0,
    });
    const [modalMapVisible, setModalMapVisible] = React.useState(false);

    const [campaigns, setCampaigns] = React.useState([]);
    const [campaign, setCampaign] = React.useState();
    const [category, setCategory] = React.useState("");

    const [missingFields, setMissingFields] = React.useState(true);

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange: (e, date) => setDate(date),
            mode: currentMode,
            is24Hour: true,
            display: "spinner",
            maximumDate: new Date(),
        });
    };

    const reset = () => {
        setImages([]);
        setTitle("");
        setDescription("");
        setDate(new Date());
        setLocation({
            latitude: 0,
            longitude: 0,
        });
    }

    const uploadImages = (id) => {
        var headers = new Headers();
        headers.append("Content-Type", "multipart/form-data");

        images.forEach(image => {
            let localUri = image;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let formData = new FormData();
            formData.append('image', { uri: localUri, name: filename, type });

            let putOptions = {
                method: 'PUT',
                headers: headers,
                body: formData,
            };

            fetch('http://' + ipAddress + ':8080/observation/' + id + '/upload', putOptions)
                .then(res => {
                    console.log("images uploaded");
                }).catch(err => {
                    console.log("error response", err.response);
                });
        });
    }

    const postObservation = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        let formattedDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

        const data = JSON.stringify({
            "author": auth.currentUser.displayName,
            "campaign_id": campaign.id,
            "taxonomyGroup": category,
            "title": title,
            "coordinates": {
                "longitude": location.longitude,
                "latitude": location.latitude
            },
            "description": description,
            "creationDate": formattedDate
        });

        let postOptions = {
            method: 'POST',
            headers: headers,
            body: data,
        };

        fetch('http://' + ipAddress + ':8080/observation/create', postOptions)
            .then(response => response.json())
            .then(json => {
                uploadImages(json.id);
                navigation.navigate('SigthingAdded', {
                    creation: true,
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
        fetch('http://' + ipAddress + ':8080/campaigns')
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

                if (missingFields) Alert.alert('Missing Fields', 'Observation could not be created. Please make sure all fields are correctly filled.');
                else {
                    postObservation();
                    reset();
                }
            });

            return unsubscribe;
        }, [navigation, missingFields, date])
    );

    React.useEffect(() => {
        if (images.length == 0
            || title == ""
            || description == ""
            || campaign == null
            || category == "") setMissingFields(true);
        else setMissingFields(false);
    }, [images, title, description, campaign, category])

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Add Sigthing"} />,
        });

        fetchCampaigns();
    }, [])

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
    }, [])

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