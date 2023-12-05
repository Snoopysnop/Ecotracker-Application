import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { auth } from '../../firebase'
import Comment from './Comment';
import CommentInput from './CommentInput';
import NotConnected from './NotConnected';

export default function CommentSection({ route, comments }) {
    const user = auth.currentUser;

    const noComments = (
        <View style={styles.view}>
                <CommentInput
                    reply={false}
                /> 
            <Text style={styles.subtitle}>No comments yet, be the first!</Text>
        </View>
    )

    const commentSection = (
        <View>
                <CommentInput
                    reply={false}
                />
            {
                comments?.map((comment, indexComment) => (
                    <View key={"comment" + indexComment}>
                        <Comment comment={comment} reply={false} user={user.displayName} />
                        {
                            comment.replies &&
                            <View>
                                {comment.replies?.map((replies, indexReplies) => (
                                    <Comment
                                        key={"comment" + indexComment + "reply" + indexReplies}
                                        comment={replies}
                                        reply={true}
                                        user={user.displayName}
                                    />
                                ))}
                            </View>
                        }
                    </View>
                ))
            }
        </View>
    )

    return (
        (comments.length ?
            commentSection :
            noComments
        )
    )
}

const styles = StyleSheet.create({
    view: {
        paddingBottom: 100,
        width: '100%',
        justifyContent: 'center', //Centered vertically
        alignItems: 'center', //Centered horizontally
    },
    subtitle: {
        textAlign: 'center',
        alignSelf: 'center',
        fontWeight: '200',
        color: 'grey',
        fontStyle: 'italic',
        maxWidth: 250,
        paddingTop: 50,
    },
})