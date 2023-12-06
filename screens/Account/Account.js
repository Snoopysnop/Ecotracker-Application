import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ipAddress } from '../../config';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../firebase';
import NavigationTitle from '../../components/NavigationTitle';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { getDownloadURL } from 'firebase/storage';


export default function Account({ navigation }) {
    const user = auth.currentUser;
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
            const storageRef = ref(storage, `profilePictures/${user.uid}`);
            const response = await fetch(newProfilePicture);
            const blob = await response.blob();
            await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(storageRef);
    
            await user.updateProfile({
            photoURL: downloadURL,
            });
            setImage(downloadURL);
            await user.reload();
            console.log('Profile picture updated successfully in Firestore');
        } catch (error) {
            console.error('Error updating profile picture in Firestore:', error);
        }
 
        var headers = new Headers();
        headers.append("Content-Type", "multipart/form-data");

        let localUri = newProfilePicture;
        let filename = localUri.split('/').pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();
        formData.append('image', { uri: localUri, name: filename, type });

        let patchOptions = {
            method: 'PATCH',
            headers: headers,
            body: formData,
        };
        
        fetch('http://' + ipAddress + ':8080/user/' + user.displayName + '/upload', patchOptions)
            .then(res => {
                console.log("profile picture updated");
            }).catch(err => {
                console.error(err.response);
            });
    }

    const pickImage = async () => {
        
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [1, 1],
            quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            if (user) {
                updateProfilePicture(result.assets[0].uri).then(()=>{
                    setImage(result.assets[0].uri);
                    user.reload();
                   
                });
            } else {
                console.error('User not authenticated');
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
            source={{ uri: user.photoURL }}
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
                        <Text style={styles.info}>{user.displayName}</Text>
                    </View>

                    <View style={styles.textContainer}>
                        <Text>Email</Text>
                        <Text style={styles.info}>{user.email}</Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <Text>Creation Date</Text>

                        <Text style={styles.info}>{
                        new Date(user.metadata.creationTime).toLocaleDateString()
                        }</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={handleSignOut}>
                    <Text style={styles.button}
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
        color: '#C93838',
        borderColor: '#C93838',
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