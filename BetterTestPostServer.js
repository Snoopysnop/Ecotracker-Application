import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';


export default function BetterTestPostServer() {
    const [photo, setPhoto] = React.useState(null);
    const [photoShow, setPhotoShow] = React.useState(null);

    const takePhotoAndUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (result.canceled) {
            return;
        }

        let localUri = result.assets[0].uri;
        setPhotoShow(localUri);
        let filename = localUri.split('/').pop();

        console.log("localUri", localUri);
        console.log("filename", filename);

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        console.log("type", type);


        var data = JSON.stringify({
            "author": "Srall",
            "campaign_id": 105,
            "taxonomyGroup": "Insects",
            "title": "title",
            "coordinates": {
                "longitude": 0,
                "latitude": 0
            },
            "description": "description",
            "creationDate": "2023-07-08 12:04:54"
        });

        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        let postOptions = {
            method: 'POST',
            headers: headers,
            body: data,
        };

        fetch('http://' + "192.168.43.73" + ':8080/observation/create', postOptions)
                .then(response => console.log(response.status))
                .catch((error) => {
                    console.error(error);
                })


        let formData = new FormData();
        // formData.append("observationDTO", blob);
        // formData.append("observationDTO", json);
        formData.append('image', { uri: localUri, name: filename, type });

        await axios.put('http://192.168.43.73:8080/observation/302/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        }).then(res => {
            console.log("observation created");
            setPhoto(res.data.photo.photo);
        }).catch(err => {
            console.log("error response", err.response);
        });
    }

    return (
        <View style={styles.mainBody}>

            <TouchableOpacity
                style={styles.buttonStyle}
                activeOpacity={0.5}
                onPress={takePhotoAndUpload}
            >
                <Text style={styles.buttonTextStyle}>Upload Image</Text>
            </TouchableOpacity>

            {photoShow &&
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: photoShow }}
                        style={{ height: 250, width: 250 }}
                    />
                </View>
            }

        </View>
    );
}


const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        flexDirection: 'column',
        gap: 20,
    },
    buttonStyle: {
        backgroundColor: '#307ecc',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#307ecc',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 15,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        marginLeft: 35,
        marginRight: 35,
        textAlign: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#d9d6d6',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    titleContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 23,
        fontWeight: 'bold',
    },
});