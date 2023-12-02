import React from 'react';
import {StyleSheet, View} from 'react-native';

import Dot from './Dot';

const Pagination = ({data, x, size}) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        return <Dot key={i} x={x} index={i} size={size} />;
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});