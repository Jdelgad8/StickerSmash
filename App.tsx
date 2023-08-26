import React, { useRef, useState } from "react";
import {
  GestureResponderEvent,
  ImageSourcePropType,
  Linking,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  Button,
  CircleButton,
  IconButton,
  PrimaryButton,
} from "components/Button";
import { ImageViewer } from "components/ImageViewer";
import { EmojiList, EmojiPicker, EmojiSticker } from "components/Emoji";
import { checkPermission } from "helpers/permissions";
import { AskPermissionModal } from "components/Modal";
import { saveMobileImage, saveWebImage } from "./helpers";

const PlaceHolderImage: ImageSourcePropType = require("./assets/images/imagen-cool.png");

const App: React.FC = () => {
  const imageRef = useRef<View>(null);

  const [mediaStatus, requestPermission] = MediaLibrary.usePermissions();

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isPermissionModalVisible, setIsPermissionModalVisible] =
    useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType>();

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

  const hasMediaPermission = mediaStatus?.granted === true;

  const onPickImageButtonPress = async () => {
    checkPermission<MediaLibrary.PermissionResponse>({
      status: mediaStatus,
      requestPermission,
      setShowModal: setIsPermissionModalVisible,
    });
    if (hasMediaPermission) {
      pickImage();
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

  const onSaveImage = async () => {
    checkPermission<MediaLibrary.PermissionResponse>({
      status: mediaStatus,
      requestPermission,
      setShowModal: setIsPermissionModalVisible,
    });
    if (!hasMediaPermission) return;
    if (Platform.OS === "web") {
      saveWebImage<View>(imageRef);
    }
    if (Platform.OS === "ios" || Platform.OS === "android") {
      saveMobileImage<View>(imageRef);
    }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onGoToSettingsPress = () => {
    Linking.openSettings();
    setIsPermissionModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={container}>
      <AskPermissionModal
        title={"Media permission required"}
        body={"Please go to settings and allow Expo Go to access media files"}
        isVisible={isPermissionModalVisible}
        onPress={onGoToSettingsPress}
      />
      <View style={imageContainer}>
        <View
          ref={imageRef}
          collapsable={false}
        >
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
        </View>
      </View>
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

const {
  container,
  footerContainer,
  optionsContainer,
  optionsRow,
  imageContainer,
} = StyleSheet.create({
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
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
});

export default App;
