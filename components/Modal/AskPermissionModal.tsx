import { Button } from "components/Button";
import { COLORS } from "constants";
import { FC } from "react";
import {
  GestureResponderEvent,
  Linking,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";

export type AskPermissionModalProps = {
  title: string;
  body: string;
  isVisible: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

export const AskPermissionModal: FC<AskPermissionModalProps> = ({
  title,
  body,
  isVisible,
  onPress,
}) => {
  return (
    <Modal
      animationType='fade'
      transparent
      visible={isVisible}
      style={{ display: "flex" }}
    >
      <View style={modalContainer}>
        <Text style={modalTitle}>{title}</Text>
        <Text style={modalBody}>{body}</Text>
        <Button
          label={"Go to settings"}
          onPress={onPress}
        />
      </View>
    </Modal>
  );
};
const { modalContainer, modalBody, modalTitle } = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.darkBackground,
    justifyContent: "center",
    alignItems: "center",
    height: "25%",
    width: "75%",
    padding: 10,
    borderRadius: 18,
    position: "absolute",
    top: "40%",
    left: "12%",
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: COLORS.light,
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 18,
    fontWeight: "normal",
    color: COLORS.light,
  },
});
