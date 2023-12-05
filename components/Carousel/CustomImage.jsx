import React from 'react';
import { StyleSheet, Image, View } from 'react-native';

import Animated from 'react-native-reanimated';

const CustomImage = ({ item, index, size, spacer }) => {
  if (!item) {
    return <View style={{ width: spacer }} key={index} />;
  }

  return (
    <View style={{ width: size }} key={index}>
      <Animated.View style={[styles.imageContainer]}>
        <Image
          source={{ uri: `data:image/png;base64,${item}` }}
          style={[styles.image, { aspectRatio: 1 }]}
        />
      </Animated.View>
    </View>
  );
};

export default CustomImage;

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: undefined,
  },
});