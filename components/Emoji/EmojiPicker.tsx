import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "constants/styles/theme";

export type EmojiPickerProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const EmojiPicker = ({
  isVisible,
  children,
  onClose,
}: React.PropsWithChildren<EmojiPickerProps>) => {
  return (
    <Modal
      animationType='slide'
      transparent
      visible={isVisible}
    >
      <View style={modalContent}>
        <View style={titleContainer}>
          <Text style={title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons
              name='close'
              color={theme.color.light}
              size={22}
            />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};

const { modalContent, title, titleContainer } = StyleSheet.create({
  modalContent: {
    height: "25%",
    width: "100%",
    backgroundColor: theme.color.backgroundSecondary,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: theme.color.backgroundPrimary,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: theme.color.light,
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
});
