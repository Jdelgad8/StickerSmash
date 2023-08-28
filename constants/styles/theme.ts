import { TextStyle, ViewStyle } from "react-native";

export type ThemeColorsKeysType =
  | "textPrimary"
  | "textLight"
  | "lightBackground"
  | "backgroundPrimary"
  | "backgroundSecondary"
  | "borderPrimary"
  | "iconPrimary"
  | "light";

export type ThemeFontSizeKeysType = "body" | "subHeading" | "heading";

export type ThemeFontWeightKeysType =
  | "regular"
  | "medium"
  | "semiBold"
  | "bold";

export type ThemeFontFamilyKeysType = "main";

export type ThemeKeysType =
  | ThemeColorsKeysType
  | ThemeFontSizeKeysType
  | ThemeFontWeightKeysType
  | ThemeFontFamilyKeysType;

export type ThemeKeys = keyof TextStyle | keyof ViewStyle;

export interface ITheme {
  color: Record<ThemeColorsKeysType, string>;
  fontSize: Record<ThemeFontSizeKeysType, number>;
  fontFamily: Record<ThemeFontFamilyKeysType, string>;
  fontWeight: Record<ThemeFontWeightKeysType, TextStyle["fontWeight"]>;
}

type RecordsTypes =
  | Record<ThemeColorsKeysType, string>
  | Record<ThemeFontSizeKeysType, number>
  | Record<ThemeFontFamilyKeysType, string>
  | Record<ThemeFontWeightKeysType, TextStyle["fontWeight"]>;

export const theme: ITheme = Object.freeze({
  color: {
    textPrimary: "#25292e",
    textLight: "#fff",
    lightBackground: "#fff",
    backgroundPrimary: "#464C55",
    backgroundSecondary: "#25292e",
    borderPrimary: "#ffd33d",
    iconPrimary: "#25292e",
    light: "#fff",
  },
  fontSize: {
    body: 14,
    subHeading: 18,
    heading: 24,
  },
  fontFamily: {
    main: "System",
  },
  fontWeight: {
    regular: "400" as TextStyle["fontWeight"],
    medium: "500" as TextStyle["fontWeight"],
    semiBold: "600" as TextStyle["fontWeight"],
    bold: "700" as TextStyle["fontWeight"],
  },
});
