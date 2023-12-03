import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import NavigationTitle from '../../components/NavigationTitle';

export default function Account({ navigation, route }) {
    const user = route.params?.user;

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Account"} />,
        });
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
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
                        src={user.profilePicture}
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
                        <Text style={styles.info}>{new Date(user.creationDate).toLocaleDateString()}</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={() => console.log("TODO handle log out")}>
                    <Text style={{
                        color: '#2E9A99',
                        borderColor: '#2E9A99',
                        ...styles.button
                    }}
                    >Log Out</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log("TODO handle delete account")}>
                    <Text style={{
                        color: '#C93838',
                        borderColor: '#C93838',
                        ...styles.button
                    }}
                    >Delete Account</Text>
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