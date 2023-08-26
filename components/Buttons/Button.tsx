import React from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type ButtonProps = {
  label: String;
  onPress: (event: GestureResponderEvent) => void;
};

export const Button = ({ label, onPress }: ButtonProps) => {
  const { button, buttonContainer, buttonLabel } = buttonStyles;
  return (
    <View style={buttonContainer}>
      <Pressable
        style={button}
        onPress={onPress}
      >
        <Text style={buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

export const buttonStyles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
