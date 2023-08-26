import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { COLORS } from "../../constants/styles/colors";

import { ButtonProps } from "./Button";

const CircleButton = ({ onPress }: Omit<ButtonProps, "label">) => {
  return (
    <View style={circleButtonContainer}>
      <Pressable
        style={circleButton}
        onPress={onPress}
      >
        <MaterialIcons
          name='add'
          size={38}
          color={COLORS.iconTextColor}
        />
      </Pressable>
    </View>
  );
};

export default CircleButton;

const { circleButtonContainer, circleButton } = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: COLORS.borderColor,
    borderRadius: 42,
    padding: 3,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
  },
});
