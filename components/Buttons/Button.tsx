import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View
} from "react-native";
import React from "react";

export type ButtonProps = {
  label: String,
  onPress: (event: GestureResponderEvent) => void
};

const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <View style={buttonStyles.buttonContainer}>
      <Pressable
        style={buttonStyles.button}
        onPress={onPress}
      >
        <Text style={buttonStyles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

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
