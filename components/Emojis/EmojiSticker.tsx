import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  View,
} from "react-native";
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  TapGestureHandler,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

export type EmojiStickerProps = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export type AnimatedImageStyleType = StyleProp<
  Animated.AnimateStyle<StyleProp<ImageStyle>>
>;

export type onDoubleTapType = (
  event: GestureEvent<TapGestureHandlerEventPayload>
) => void;
export type onDragType = GestureEvent<PanGestureHandlerGestureEvent>;

export type dragAnimationContextType = {
  translateX: number;
  translateY: number;
};

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedView = Animated.createAnimatedComponent(View);

export const EmojiSticker = ({
  imageSize,
  stickerSource,
}: EmojiStickerProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  const onDoubleTap: onDoubleTapType = useAnimatedGestureHandler({
    onActive: () => {
      const isImageDoubled: boolean = scaleImage.value === imageSize * 2;
      scaleImage.value = isImageDoubled
        ? (scaleImage.value /= 2)
        : (scaleImage.value *= 2);
    },
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context: dragAnimationContextType) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const imageStyle: AnimatedImageStyleType = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });
  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, { top: -350 }]}>
        <TapGestureHandler
          onGestureEvent={onDoubleTap}
          numberOfTaps={2}
        >
          <AnimatedImage
            source={stickerSource}
            resizeMode='contain'
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </TapGestureHandler>
      </AnimatedView>
    </PanGestureHandler>
  );
};
