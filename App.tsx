import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  GestureResponderEvent,
  ImageSourcePropType,
  StyleSheet,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import Button from "./components/Buttons/Button";
import CircleButton from "./components/Buttons/CircleButton";
import IconButton from "./components/Buttons/IconButton";
import ImageViewer from "./components/ImageViewer";
import PrimaryButton from "./components/Buttons/PrimaryButton";
import EmojiPicker from "./components/Emoji/EmojiPicker";
import EmojiList from "./components/Emoji/EmojiList";
import EmojiSticker from "./components/Emoji/EmojiSticker";

export type AppProps = {};
const PlaceHolderImage: ImageSourcePropType = require("./assets/images/imagen-cool.png");

const App: React.FC<AppProps> = () => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType>();

  const onPickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
  };

  const onUseImage = (e: GestureResponderEvent) => {
    setShowAppOptions(true);
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage("");
    setPickedEmoji(undefined);
  };
  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onSaveImage = () => {
    // TODO
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };
  return (
    <GestureHandlerRootView style={container}>
      <ImageViewer
        placeHolderImage={PlaceHolderImage}
        selectedImage={selectedImage}
      />
      {pickedEmoji && (
        <EmojiSticker
          imageSize={40}
          stickerSource={pickedEmoji}
        />
      )}
      {showAppOptions ? (
        <View style={optionsContainer}>
          <View style={optionsRow}>
            <IconButton
              icon='refresh'
              label='Reset'
              onPress={onReset}
            />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon='save-alt'
              label='Save'
              onPress={onSaveImage}
            />
          </View>
        </View>
      ) : (
        <>
          <View style={footerContainer}>
            <PrimaryButton
              label='Choose a photo'
              onPress={onPickImage}
            />
            <Button
              label='Use this photo'
              onPress={onUseImage}
            />
          </View>
        </>
      )}
      <EmojiPicker
        isVisible={isModalVisible}
        onClose={onModalClose}
      >
        <EmojiList
          onSelect={setPickedEmoji}
          onCloseModal={onModalClose}
        />
      </EmojiPicker>
      <StatusBar style='auto' />
    </GestureHandlerRootView>
  );
};

const { container, footerContainer, optionsContainer, optionsRow } =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#25292e",
      alignItems: "center",
    },
    footerContainer: {
      flex: 1 / 3,
      alignItems: "center",
    },
    optionsContainer: {
      position: "absolute",
      bottom: 80,
    },
    optionsRow: {
      alignItems: "center",
      flexDirection: "row",
    },
  });

export default App;
