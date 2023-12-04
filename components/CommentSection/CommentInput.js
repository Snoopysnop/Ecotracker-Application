import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

import { ipAddress } from '../../config';


export default function CommentInput({ parentCommentID, user, reply, setReplyInputOpen, reload, setReload, observationID }) {
    const [comment, setComment] = React.useState("");

    const postComment = () => {
        var headers = new Headers();
        headers.append("Content-Type", "application/json");

        var data = JSON.stringify({
            "author": user,
            "content": comment
        });

        let postOptions = {
            method: 'POST',
            headers: headers,
            body: data,
            redirect: 'follow'
        };

        if (reply) {
            fetch('http://' + ipAddress + ':8080/observation/comment/' + parentCommentID + '/reply', postOptions)
                .then(response => setReload(!reload))
                .catch((error) => {
                    console.error(error);
                })
        }
        else {
            fetch('http://' + ipAddress + ':8080/observation/' + observationID + '/comment', postOptions)
                .then(response => setReload(!reload))
                .catch((error) => {
                    console.error(error);
                })
        }
    }

    return (
        <View
            style={{
                paddingTop: (reply ? 5 : 0),
                ...styles.container
            }}
        >
            <Image
                src={user.profilePicture}
                style={styles.avatar}
            />

            <TextInput
                style={{
                    width: reply ? 160 : 210,
                    ...styles.inputStyle
                }}
                placeholder={
                    reply
                        ? "type your reply here..."
                        : "type your comment here..."
                }
                placeholderTextColor='grey'
                value={comment}
                onChangeText={setComment}
                autoCapitalize="none"
                autoCorrect={false}
            />

            <TouchableOpacity onPress={() => {
                if (reply) setReplyInputOpen(false);
                postComment();
            }}>
                <View style={{
                    backgroundColor: '#2E9A99',
                    borderRadius: 10,
                    padding: 10,
                    paddingHorizontal: 10,
                }}>
                    <Image
                        source={require('../../assets/icons/send.png')}
                        style={{
                            tintColor: '#fff',
                            width: 20,
                            height: 20,
                        }}
                    />
                </View>
            </TouchableOpacity >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 10,
        gap: 10,
        alignItems: 'center',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        fontWeight: '600',
    },
    subtitle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: '200',
        color: 'grey',
        fontStyle: 'italic',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    inputStyle: {
        borderColor: "#bbb",
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5,
    },
})