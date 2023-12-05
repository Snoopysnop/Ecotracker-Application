import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { auth, firestore, storage } from '../../firebase';
import NavigationTitle from '../../components/NavigationTitle';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getFirestore, collection, doc, onSnapshot } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';


export default function Account({ navigation, route }) {
    const user = route.params?.user;
    const [image, setImage] = React.useState(null);
    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Account"} />,
        });
    })

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    //firebase stuff
    const updateProfilePicture = async (newProfilePicture) => {
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
            const response = await fetch(newProfilePicture);
            const blob = await response.blob();
            await uploadBytes(storageRef, blob);
            const userDocRef = doc(collection(getFirestore(), 'users'), auth.currentUser.uid);
            const downloadURL = await getDownloadURL(storageRef);
    
        await auth.currentUser.updateProfile({
            photoURL: downloadURL,
        });
        setImage(downloadURL);
        await auth.currentUser.reload();
            console.log('Profile picture updated successfully in Firestore');
        } catch (error) {
            console.error('Error updating profile picture in Firestore:', error);
        }
    };
 

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });
    
        if (!result.canceled) {
            console.log('Image URI:', result.assets[0].uri);
            setImage(result.assets[0].uri);
            if (auth.currentUser) {
                updateProfilePicture(result.assets[0].uri).then(()=>{
                    setImage(result.assets[0].uri);
                    auth.currentUser.reload();
                   
                });
            } else {
                console.error('L\'utilisateur n\'est pas correctement authentifié');
            }
        }
    };

    return (
        <View style={{
            height: '100%',
            width: '100%',
        }}>
            <TouchableOpacity onPress={pickImage}>
                <View style={styles.profilePictureContainer}>

        <Image
            source={{ uri: auth.currentUser.photoURL }}
            style={styles.profilePicture}
        />
    
                    <Image
                        style={styles.editIcon}
                        source={require("../../assets/icons/edit.png")}
                    />
                </View>
            </TouchableOpacity>

            <View style={styles.view}>
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text>Pseudo</Text>
                        <Text style={styles.info}>{user.pseudo}</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text>Name</Text>
                        <Text style={styles.info}>{user.userName}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text>Creation Date</Text>
                        <Text style={styles.info}>{user.creationDate}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={{
                        color: '#C93838',
                        borderColor: '#C93838',
                        ...styles.button
                    }}
                    >Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        marginHorizontal: 20,
        marginBottom: 100,
        gap: 20,
        height: '100%',
    },
    container: {
        borderRadius: 10,
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        gap: 10,
    },
    textContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    info: {
        color: '#bbb',
    },
    profilePictureContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    profilePicture: {
        width: 80,
        height: 80,
        borderRadius: 80,
    },
    editIcon: {
        width: 25,
        height: 25,
        position: 'relative',
        bottom: 25,
        left: 25,
    },
    button: {

        alignContent: 'flex-end',
        borderWidth: 2,
        borderRadius: 10,
        paddingBottom: 10,
        paddingTop: 12,
        paddingHorizontal: 20,
        fontWeight: '600',
        textAlign: 'center'
    },
})  