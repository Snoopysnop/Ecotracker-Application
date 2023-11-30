import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import NavigationTitle from '../../components/NavigationTitle';

import * as ImagePicker from 'expo-image-picker';

export default function Account({ navigation, route }) {
    const [image, setImage] = React.useState('https://react.semantic-ui.com/images/avatar/small/jenny.jpg');

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Account"} />,
        });
    })

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    return (
        <View style={{
            height: '100%',
            width: '100%',
        }}>
            <View styles={styles.view}>
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.profilePictureContainer}>
                        <Image
                            src={image}
                            style={styles.profilePicture}
                        />
                        <Image
                            style={styles.editIcon}
                            source={require("../../assets/icons/edit.png")}
                        />
                    </View>
                </TouchableOpacity>

                <View style={styles.container}>
                    <View>
                        <Text style={{ marginBottom: 5 }}>Username</Text>
                    </View>

                    <View>
                        <Text style={{ marginBottom: 5 }}>Change Password</Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        margin: 20,
        marginBottom: 100,
        // gap: 20,
        // height: '100%',
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
    container: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 20,
        gap: 20,
    },
})  