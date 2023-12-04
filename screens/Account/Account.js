import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import { auth } from '../../firebase'
import NavigationTitle from '../../components/NavigationTitle';

export default function Account({ navigation, route }) {
    // TODO retrieve user's profile picture
    const [image, setImage] = React.useState('https://react.semantic-ui.com/images/avatar/small/jenny.jpg');

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
                        <Text style={{ marginBottom: 5 }}>{auth.currentUser?.email}</Text>
                    </View>

                    <View>
                        <Text style={{ marginBottom: 5 }}>Pseudo : {auth.currentUser.displayName}</Text>
                    </View>
					
					<TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
					
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        margin: 20,
        marginBottom: 100,
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