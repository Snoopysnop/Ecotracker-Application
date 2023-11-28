import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function CommentInput({ parentID, avatarImg, setReplyInputOpen }) {
    const [comment, setComment] = useState("");

    const postComment = () => {
        // TODO implement post comment
        let newComment = {
            author: "TODO current author",
            comment: comment,
            parentID: parentID,
        }
    }

    return (
        <View
            style={{
                backgroundColor: (parentID != 0 ? '' : '#E1E8E8'),
                ...styles.container
            }}
        >
            <Image
                source={avatarImg}
                style={styles.avatar}
            />

            <TextInput
                style={styles.inputStyle}
                placeholder={
                    parentID != 0
                        ? "type your reply here..."
                        : "type your comment here..."
                }
                placeholderTextColor='grey'
                value={comment}
                onChangeText={setComment}
                autoCapitalize="none"
                autoCorrect={false}
            />

            {parentID != 0 && (
                <TouchableOpacity onPress={() => setReplyInputOpen(false)}>
                    <Text style={{
                        color: '#8a8a8a',
                        backgroundColor: '#ccc',
                        ...styles.button
                    }}>Cancel</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => {
                setReplyInputOpen(false);
                postComment();
            }
            }>
                <Text style={{
                    color: '#fff',
                    backgroundColor: '#2E9A99',
                    ...styles.button
                }}>Post</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
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
        maxWidth: 250,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    inputStyle: {
        width: '100%',
        outlineStyle: 'none',
        borderColor: "#bbb",
        borderRadius: 8,
        borderWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
})