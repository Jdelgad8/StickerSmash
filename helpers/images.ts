import { Alert } from "react-native";
import domtoimage from "dom-to-image";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";

export const saveWebImage = async <T>(ref: React.RefObject<T>) => {
  try {
    const dataUrl = await domtoimage.toJpeg(ref.current, {
      quality: 0.95,
      width: 320,
      height: 440,
    });

    let link = document.createElement("a");
    link.download = "sticker-smash.jpeg";
    link.href = dataUrl;
    link.click();
  } catch (e) {
    console.log(e);
  }
};

export const saveMobileImage = async <T>(ref: React.RefObject<T>) => {
  try {
    const localUri = await captureRef(ref, { height: 440, quality: 1 });
    await MediaLibrary.saveToLibraryAsync(localUri);
    if (localUri) {
      Alert.alert("Saved!");
    }
  } catch (error) {
    console.log([error]);
  }
};
