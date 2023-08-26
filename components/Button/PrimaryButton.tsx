import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { ButtonProps, buttonStyles } from "components/Button";
import { COLORS } from "constants";

export const PrimaryButton = ({ label, onPress }: ButtonProps) => {
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

const { primaryButtonContainer, primaryButton, buttonIconTextColor } =
  StyleSheet.create({
    primaryButtonContainer: {
      borderWidth: 4,
      borderColor: COLORS.borderColor,
      borderRadius: 18,
    },
    primaryButton: {
      backgroundColor: COLORS.light,
    },
    buttonIconTextColor: {
      color: COLORS.iconTextColor,
    },
  });
