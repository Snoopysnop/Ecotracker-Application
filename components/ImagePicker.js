import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default function CustomImagePicker() {
  const [imageSources, setImageSources] = useState([]);

  const selectImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then((images) => {
      setImageSources(images.map((image) => ({ uri: image.path })));
    });
  };

  return (
    <View>
      {imageSources.map((image, index) => (
        <Image key={index} source={image} style={{ width: 200, height: 200, marginBottom: 10 }} />
      ))}
      <Button title="Select Images" onPress={selectImages} />
    </View>
  );
};