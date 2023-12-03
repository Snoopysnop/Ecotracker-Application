import React from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function CommentInput({ parentID, user, reply, setReplyInputOpen }) {
    const [comment, setComment] = React.useState("");

    const postComment = () => {
        // TODO implement post comment
        let newComment = {
            author: user.pseudo,
            comment: comment,
            parentID: parentID,
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