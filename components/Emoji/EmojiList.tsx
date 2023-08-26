import {
  FlatList,
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { EMOJI_LIST, EmojiListType } from "../../constants/emojis";

export type EmojiListProps = {
  onSelect: (item: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

const EmojiList = ({ onSelect, onCloseModal }: EmojiListProps) => {
  const [emojis, setEmojis] = useState<EmojiListType>(EMOJI_LIST);

  const onEmojiPress = (emoji: ImageSourcePropType) => {
    onSelect(emoji);
    onCloseModal();
  };
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emojis}
      contentContainerStyle={listContainer}
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onEmojiPress(item);
          }}
        >
          <Image
            source={item}
            key={index}
            style={image}
          />
        </Pressable>
      )}
    />
  );
};

export default EmojiList;

const { listContainer, image } = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
