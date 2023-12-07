import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ipAddress } from '../../config';
import CommentInput from './CommentInput';
import { auth } from '../../firebase';

import ModalUser from './ModalUser';

export default function Comment({ comment, reply, reload, setReload, parentCommentID }) {
  const [replyInputOpen, setReplyInputOpen] = React.useState(false);
  const [profilePicture, setProfilePicture] = React.useState("");
  const [modalUserVisible, setModalUserVisible] = React.useState(false);
  const user = auth.currentUser;

  const fetchProfilePicture = () => {
    fetch('http://' + ipAddress + ':8080/user/' + comment.author)
      .then(response => response.json())
      .then(json => setProfilePicture(json.image))
      .catch((error) => {
        console.error(error);
      })
  }

  React.useEffect(() => {
    fetchProfilePicture();
  }, [])

  return (
    <View style={{ paddingLeft: (reply ? 50 : 0), ...styles.commentContainer }}>
      <TouchableOpacity
        onPress={() => setModalUserVisible(true)}
      >
        <Image
          source={{ uri: `data:image/png;base64,${profilePicture}` }}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <View style={styles.content}>
        <View style={styles.nameAndDate}>
          <Text style={styles.author}>{comment.author}</Text>
          <Text style={styles.date}> {timeAgo(new Date(comment.creationDate).getTime())} </Text>
        </View>
        <View>
          <Text>{comment.content}</Text>
        </View>
        <TouchableOpacity onPress={() => setReplyInputOpen(!replyInputOpen)}>
          <Text style={styles.replyAction}>Reply</Text>
        </TouchableOpacity>
        {replyInputOpen &&
          <CommentInput
            reply={true}
            setReplyInputOpen={setReplyInputOpen}
            parentCommentID={parentCommentID ? parentCommentID : comment.id}
            reload={reload}
            setReload={setReload}
          />
        }
      </View>
      <ModalUser
        modalUserVisible={modalUserVisible}
        setModalUserVisible={setModalUserVisible}
        profilePicture={profilePicture}
        author={comment.author}
      />
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
    marginTop: 10,
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
    marginTop: 3,
    fontSize: 12,
    fontWeight: '500',
  },
})