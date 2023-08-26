import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import React from "react";

type Props = {
  selectedImage: string;
  placeHolderImage: ImageSourcePropType;
};

export const ImageViewer = ({ placeHolderImage, selectedImage }: Props) => {
  const imageSource: ImageSourcePropType = selectedImage
    ? { uri: selectedImage }
    : placeHolderImage;
  return (
    <View style={imageContainer}>
      <Image
        source={imageSource}
        style={image}
      />
    </View>
  );
};

const { image, imageContainer } = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
});
