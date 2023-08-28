import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { ButtonProps } from "./Button";
import { theme } from "constants/styles/theme";

export const CircleButton = ({ onPress }: Omit<ButtonProps, "label">) => {
  return (
    <View style={circleButtonContainer}>
      <Pressable
        style={circleButton}
        onPress={onPress}
      >
        <MaterialIcons
          name='add'
          size={38}
          color={theme.color.iconPrimary}
        />
      </Pressable>
    </View>
  );
};

const { circleButtonContainer, circleButton } = StyleSheet.create({
  circleButtonContainer: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: theme.color.borderPrimary,
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
