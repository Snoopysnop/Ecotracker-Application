import React from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Button, Text } from 'react-native';

export default ImageCarousel = ({ images, pickImage }) => {
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image
        source={{ uri: item }}
        style={styles.image} />
    </View>
  );

  const addPhotos = () => (
    images.length ?
      <TouchableOpacity style={styles.addPhotos} onPress={pickImage}>
        <Image
          source={require('../../assets/icons/more.png')}
          style={styles.addPhotosIcon}
        />
      </TouchableOpacity> :
      <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Add Photos</Text>
        </View>
      </TouchableOpacity>
  )

  return (
    <View style={{
      alignSelf: (images.length ? 'flex-start' : 'center'),
      ...styles.container
    }}>
      <FlatList
        data={images}
        renderItem={(item) => renderItem(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={addPhotos}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselItem: {
    marginTop: 5,
    marginRight: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  addPhotosIcon: {
    width: 40,
    height: 40,
    tintColor: '#2E9A99',
  },
  addPhotos: {
    width: 120,
    height: 120,
    marginTop: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 5,
  },
  button: {
    borderWidth: 2,
    borderColor: '#2E9A99',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#2E9A99',
    fontSize: 16,
    fontWeight: 'bold',
  },
});