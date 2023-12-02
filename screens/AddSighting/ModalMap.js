import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';

import MapView from 'react-native-maps';

export default function ModalMap({ modalMapVisible, setModalMapVisible, location, setLocation }) {
    const [region, setRegion] = React.useState();

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalMapVisible}
                onRequestClose={() => {
                    setModalMapVisible(!modalMapVisible);
                }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <MapView
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                initialRegion={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                                onRegionChange={setRegion}
                            />

                            <View style={styles.markerContainer}>
                                <Image
                                    source={require('../../assets/icons/marker.png')}
                                    style={styles.marker}
                                />
                            </View>

                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    setLocation({
                                        latitude: region.latitude,
                                        longitude: region.longitude,
                                    })
                                    setModalMapVisible(!modalMapVisible)
                                }}>
                                <Text style={styles.textStyle}>Set Location</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: 300,
        height: 600
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 3,
        backgroundColor: '#2E9A99',
        position: 'relative',
        bottom: 60,
        borderColor: '#fff',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    marker: {
        height: 50,
        width: 50,
        tintColor: 'rgba(222, 77, 63, 0.8)'
    },
    markerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
});