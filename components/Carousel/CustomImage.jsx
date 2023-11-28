import {StyleSheet, Image, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Animated, {useAnimatedStyle, interpolate} from 'react-native-reanimated';
const CustomImage = ({item, x, index, size, spacer}) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  // Get Image Width and Height to Calculate AspectRatio
  // useLayoutEffect(() => {
  //   if (item) {
  //     const {width, height} = Image.resolveAssetSource(item);
  //     setAspectRatio(width / height);
  //   }
  // }, [item]);

  // const style = useAnimatedStyle(() => {
  //   const scale = interpolate(
  //     x.value,
  //     [(index - 2) * size, (index - 1) * size, index * size],
  //     [0.9, 1, 0.9],
  //   );
  //   return {
  //     transform: [{scale}],
  //   };
  // });

  if (!item) {
    return <View style={{width: spacer}} key={index} />;
  }
  
  return (
    <View style={{width: size}} key={index}>
      <Animated.View style={[styles.imageContainer]}>
        <Image
          // source={require("../../assets/" + item)}
          style={[styles.image, {aspectRatio: aspectRatio}]}
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