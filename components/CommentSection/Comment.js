import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import CommentInput from './CommentInput';
import NotConnected from './NotConnected';

// TODO retrieve author information
export default function Comment({ comment, reply, user }) {
  const [replyInputOpen, setReplyInputOpen] = React.useState(false);

  return (
    <View style={{ paddingLeft: (reply ? 50 : 0), ...styles.commentContainer }}>
      <Image
        src={comment.profilePicture}
        style={styles.avatar}
      />
      <View style={styles.content}>
        <View style={styles.nameAndDate}>
          <Text style={styles.author}>{comment.author}</Text>
          <Text style={styles.date}> {timeAgo(new Date(comment.date).getTime())} </Text>
        </View>
        <View>
          <Text>{comment.content}</Text>
        </View>
        <TouchableOpacity onPress={() => setReplyInputOpen(!replyInputOpen)}>
          <Text style={styles.replyAction}>Reply</Text>
        </TouchableOpacity>
        {replyInputOpen && (user ?
          <CommentInput
            user={user}
            reply={true}
            setReplyInputOpen={setReplyInputOpen}
            parentID={comment.id} /> :
          <NotConnected />
        )
        }
      </View>
    </View>
  )
}

// returns a string that represents how long ago the date was
const timeAgo = (date) => {
  const seconds = Math.floor((Date.now() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) {
    return interval + ' years ago';
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months ago';
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days ago';
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours ago';
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes ago';
  }

  if (seconds < 10) return 'just now';

  return Math.floor(seconds) + ' seconds ago';
};

const styles = StyleSheet.create({
  commentContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  content: {
    flex: 1,
  },
  nameAndDate: {
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'baseline',
  },
  author: {
    fontWeight: '600',
  },
  date: {
    fontWeight: '200',
    color: 'grey',
    fontSize: 12,
  },
  replyAction: {
    color: 'grey',
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
})