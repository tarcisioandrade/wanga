import { pms } from "../utils/metrics";

const lightTheme = {
  PRIMARY: "#185DCF",
  SECONDARY: "#F0F4FF",

  WARNING: "#FDBD31",

  WHITE: "#FFFFFF",

  GRAY_500: "#ACACAC",
  GRAY_600: "#969696",

  DARK_700: "#3F3F3F",
  DARK_800: "#2A2A2A",
  DARK_900: "#232222",

  BG_COLOR: "#FFFFFF",
  TEXT_COLOR: "#000000",

  FONT_XXS: pms(11),
  FONT_XS: pms(12),
  FONT_BASE: pms(16),
  FONT_MD: pms(18),

  FONT_FAMILY: {
    REGULAR: "SF-Pro-Display-Regular",
    MEDIUM: "SF-Pro-Display-Medium",
    SEMIBOLD: "SF-Pro-Display-SemiBold",
    BOLD: "SF-Pro-Display-Bold",
  },
};

const darkTheme = {
  ...lightTheme,

  SECONDARY: "#232222",

  BG_COLOR: "#2A2A2A",
  TEXT_COLOR: "#FFFFFF",
};

export { lightTheme, darkTheme };
