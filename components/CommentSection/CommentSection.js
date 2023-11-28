import React from 'react'

import Comment from './Comment';
import NoResult from '../NoResult';
import { Text, View, StyleSheet } from 'react-native';
import CommentInput from './CommentInput';
import NotConnected from './NotConnected';

export default function CommentSection({ comments }) {
    const [error, setError] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    // TODO replace with true information
    const userConnected = false;

    const noComments = (
        <View style={styles.view}>
            <Text style={styles.subtitle}>No comments yet, be the first!</Text>
        </View>
    )

    const commentSection = (
        <View>
            {userConnected ?
                <CommentInput
                    reply={false}
                    avatarImg='https://react.semantic-ui.com/images/avatar/small/elliot.jpg'
                /> :
                <NotConnected />
            }
            {
                comments.map((comment, indexComment) => (
                    <View key={"comment" + indexComment}>
                        <Comment comment={comment} reply={false} />
                        {
                            comment.replies &&
                            <View>
                                {comment.replies?.map((replies, indexReplies) => (
                                    <Comment key={"comment" + indexComment + "reply" + indexReplies} comment={replies} reply={true}/>
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
        height: '100%',
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
    },
})