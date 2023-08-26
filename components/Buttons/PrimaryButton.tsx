import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { COLORS } from "../../constants/styles/colors";

import { ButtonProps, buttonStyles } from "./Button";

const PrimaryButton = ({ label, onPress }: ButtonProps) => {
  return (
    <View style={[buttonStyles.buttonContainer, primaryButtonContainer]}>
      <Pressable
        style={[buttonStyles.button, primaryButton]}
        onPress={onPress}
      >
        <FontAwesome
          name='picture-o'
          size={18}
          color={COLORS.iconTextColor}
          style={buttonStyles.buttonIcon}
        />
        <Text style={[buttonStyles.buttonLabel, buttonIconTextColor]}>
          {label}
        </Text>
      </Pressable>
    </View>
  );
};

export default PrimaryButton;

const { primaryButtonContainer, primaryButton, buttonIconTextColor } =
  StyleSheet.create({
    primaryButtonContainer: {
      borderWidth: 4,
      borderColor: COLORS.borderColor,
      borderRadius: 18,
    },
    primaryButton: {
      backgroundColor: "#fff",
    },
    buttonIconTextColor: {
      color: COLORS.iconTextColor,
    },
  });
