import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import ImageCarousel from './ImageCarousel';

export default function ImagesPicker({ images, setImages }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImages(result.assets.map(asset => asset.uri));
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!images.length ?
        <TouchableOpacity style={styles.buttonContainer} onPress={pickImage}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add Photos</Text>
          </View>
        </TouchableOpacity> :
        <ImageCarousel images={images} pickImage={pickImage}/>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 5,
  },
  button: {
    borderWidth: 2,
    borderColor: '#2E9A99',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  buttonText: {
    color: '#2E9A99',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
