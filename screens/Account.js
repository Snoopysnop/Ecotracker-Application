import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import NavigationTitle from '../components/NavigationTitle';

export default function Account({ navigation, route }) {
    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: () => <NavigationTitle title={"Account"} />,
        });
    })

    return (
        <View style={{
            height: '100%',
            width: '100%',
        }}>
            <View styles={styles.view}>
                <TouchableOpacity>
                    <View style={styles.profilePictureContainer}>
                        <Image
                            src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg'
                            style={styles.profilePicture}
                        />
                        <Image
                            style={styles.editIcon}
                            source={require("../assets/icons/edit.png")}
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