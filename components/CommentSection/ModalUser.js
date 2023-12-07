import React from 'react';
import { Modal, StyleSheet, Text, Pressable, View, Image } from 'react-native';

export default function ModalUser({ modalUserVisible, setModalUserVisible, profilePicture, author }) {
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalUserVisible}
                onRequestClose={() => {
                    setModalUserVisible(!modalUserVisible);
                }}>
                <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Image
                                source={{ uri: `data:image/png;base64,${profilePicture}` }}
                                style={styles.avatar}
                            />

                            <View style={styles.container}>
                                <View style={styles.textContainer}>
                                    <Text>Pseudo</Text>
                                    <Text style={styles.info}>{author}</Text>
                                </View>

                                <View style={styles.textContainer}>
                                    <Text>Email</Text>
                                    <Text style={styles.info}>{author}@bdd.com</Text>
                                </View>
                            </View>

                            <Pressable
                                style={styles.button}
                                onPress={() => {
                                    setModalUserVisible(!modalUserVisible)
                                }}>
                                <Text style={styles.textStyle}>  Close  </Text>
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
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
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
        width: 250,
        height: 220
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 3,
        backgroundColor: '#2E9A99',
        position: 'relative',
        bottom: 5,
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
});