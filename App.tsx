import React, { useState } from "react";
import {
  ImageSourcePropType,
  GestureResponderEvent,
  StyleSheet,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from "expo-media-library";

import { ImageViewer } from "components/ImageViewer";
import { ACCESS_PRIVILEGES } from "constants";
import { Button, CircleButton, IconButton, PrimaryButton } from "buttons";
import { EmojiList, EmojiPicker, EmojiSticker } from "emojis";
import { checkPermission } from "helpers/permissions";

const PlaceHolderImage: ImageSourcePropType = require("./assets/images/imagen-cool.png");

const App: React.FC = () => {
  const [mediaStatus, requestPermission] = MediaLibrary.usePermissions();
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isPermissionModalVisible, setIsPermissionModalVisible] =
    useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType>();

  console.log("rendered");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    }
  };

  const onPickImageButtonPress = async () => {
    checkPermission<MediaLibrary.PermissionResponse>({
      status: mediaStatus,
      requestPermission,
      setShowModal: setIsPermissionModalVisible,
    });
    const hasMediaPermission =
      mediaStatus?.accessPrivileges !== ACCESS_PRIVILEGES.NONE;
    if (!hasMediaPermission) {
      mediaStatus.accessPrivileges;
      return;
    }
    pickImage();
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
      {isPermissionModalVisible && <></>}
      {/* TODO: Add Modal when user doesn't have permissions */}
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
              onPress={onPickImageButtonPress}
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
