import React from 'react';
import {StyleSheet} from 'react-native';

import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

const Dot = ({x, index, size}) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [8, 16, 8],
      Extrapolate.CLAMP,
    );
    const opacityAnimation = interpolate(
      x.value,
      [(index - 1) * size, index * size, (index + 1) * size],
      [0.5, 1, 0.5],
      Extrapolate.CLAMP,
    );
    return {
      width: widthAnimation,
      opacity: opacityAnimation,
    };
  });
  return <Animated.View style={[styles.dots, animatedDotStyle]} />;
};

export default Dot;

const styles = StyleSheet.create({
  dots: {
    height: 8,
    backgroundColor: '#2E9A99',
    marginHorizontal: 5,
    borderRadius: 4,
  },
});