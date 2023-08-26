import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export type EmojiPickerProps = {
  isVisible: boolean;
  onClose: () => void;
};

const EmojiPicker = ({
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
              color='#fff'
              size={22}
            />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
};

export default EmojiPicker;

const { modalContent, pickerContainer, title, titleContainer } =
  StyleSheet.create({
    modalContent: {
      height: "25%",
      width: "100%",
      backgroundColor: "#25292e",
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: "absolute",
      bottom: 0,
    },
    titleContainer: {
      height: "16%",
      backgroundColor: "#464C55",
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    title: {
      color: "#fff",
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
