import React, { RefObject } from "react";
import { Image, ImageSourcePropType, StyleSheet } from "react-native";

type Props = {
  selectedImage: string;
  placeHolderImage: ImageSourcePropType;
};

export const ImageViewer = ({ placeHolderImage, selectedImage }: Props) => {
  const imageSource: ImageSourcePropType = selectedImage
    ? { uri: selectedImage }
    : placeHolderImage;
  return (
    <Image
      source={imageSource}
      style={image}
    />
  );
};

const { image } = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
