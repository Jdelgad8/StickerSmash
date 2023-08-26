import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { ButtonProps } from "./Button";

export type IconButton = ButtonProps & {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
};

const IconButton = ({ icon, label, onPress }: IconButton) => {
  return (
    <Pressable
      style={iconButton}
      onPress={onPress}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color='#fff'
      />
      <Text style={iconButtonLabel}>{label}</Text>
    </Pressable>
  );
};

export default IconButton;

const { iconButton, iconButtonLabel } = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
