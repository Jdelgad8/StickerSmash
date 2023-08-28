import React, { FC } from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewProps,
} from "react-native";
import {
  ITheme,
  ThemeColorsKeysType,
  ThemeFontFamilyKeysType,
  ThemeFontSizeKeysType,
  ThemeFontWeightKeysType,
  theme,
} from "theme";

export interface ITextThemeConfig {
  color: ThemeColorsKeysType;
  fontSize: ThemeFontSizeKeysType;
  fontFamily: ThemeFontFamilyKeysType;
  fontWeight: ThemeFontWeightKeysType;
}

export type TextThemeConfigValuesType =
  | ThemeColorsKeysType
  | ThemeFontSizeKeysType
  | ThemeFontFamilyKeysType
  | ThemeFontWeightKeysType
  | undefined;

export type StyledTextProps = React.PropsWithChildren &
  ViewProps & {
    style?: StyleProp<TextStyle>;
    themeConfig?: Partial<ITextThemeConfig>;
  };

export const StyledText: FC<StyledTextProps> = ({
  style,
  themeConfig,
  children,
  ...props
}: StyledTextProps) => {
  if (themeConfig) {
    console.log(Object.entries(themeConfig));
    for (const [key, value] of Object.entries(themeConfig)) {
      console.log(`${key}: ${value}`);
    }
  }
  const configStyles = [
    // textStyles,
    themeConfig &&
      Object.entries(themeConfig).map(([key, value]) => {
        console.log(key);
        console.log(value);
        // const themeConfigKey = themeKey as keyof ITextThemeConfig;
        const themeConfigValue: TextThemeConfigValuesType =
          themeConfig[key as keyof ITheme];
        // console.log(themeConfigKey);
        console.log(themeConfigValue);
        console.log(theme[key as keyof ITheme]);
        return {
          [key]: theme[key as keyof ITheme][themeConfigValue],
        };
      }),
  ];
  console.log({ configStyles });
  return <Text {...props}>{children}</Text>;
};

const textStyles = StyleSheet.create({
  text: {
    color: theme.color.textPrimary,
    fontFamily: theme.fontFamily.main,
    fontSize: theme.fontSize.body,
    fontWeight: theme.fontWeight.regular,
  },
  bold: {
    fontWeight: theme.fontWeight.bold,
  },
  heading: {
    fontSize: theme.fontSize.heading,
  },
  subHeading: {
    fontSize: theme.fontSize.subHeading,
  },
  body: {
    fontSize: theme.fontSize.body,
  },
  primary: {
    color: theme.color.textPrimary,
  },
  light: {
    color: theme.color.textLight,
  },
});
