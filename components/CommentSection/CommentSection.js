import React from 'react'
import { Text, View, StyleSheet } from 'react-native';

import Comment from './Comment';
import CommentInput from './CommentInput';
import NotConnected from './NotConnected';

export default function CommentSection({ route, comments, reload, setReload, observationID }) {
    const user = route.params?.user;

    const noComments = (
        <View style={styles.view}>
            {user ?
                <CommentInput
                    reply={false}
                    user={user}
                    observationID={observationID}
                    reload={reload}
                    setReload={setReload}
                /> :
                <NotConnected />
            }
            <Text style={styles.subtitle}>No comments yet, be the first!</Text>
        </View>
    )

    const commentSection = (
        <View>
            {user ?
                <CommentInput
                    reply={false}
                    user={user}
                    reload={reload}
                    setReload={setReload}
                    observationID={observationID}
                /> :
                <NotConnected />
            }
            {
                comments?.map((comment, indexComment) => (
                    <View key={"comment" + indexComment}>
                        <Comment
                            comment={comment}
                            reply={false}
                            user={user}
                            reload={reload}
                            setReload={setReload}
                            observationID={observationID}
                        />
                        {
                            comment.replies &&
                            <View>
                                {comment.replies?.map((replies, indexReplies) => (
                                    <Comment
                                        key={"comment" + indexComment + "reply" + indexReplies}
                                        comment={replies}
                                        reply={true}
                                        user={user}
                                        reload={reload}
                                        setReload={setReload}
                                        observationID={observationID}
                                        parentCommentID={comment.id}
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