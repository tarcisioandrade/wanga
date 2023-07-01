import { pms } from "src/utils/metrics";

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

  // other
  MENU_ITEM_COLOR: "#185DCF",
  TAB_ITEM_COLOR: "#FFFFFF",

  FONT_XXS: pms(11),
  FONT_XS: pms(12),
  FONT_SM: pms(14),
  FONT_BASE: pms(16),
  FONT_MD: pms(17),
  FONT_LG: pms(18),

  FONT_FAMILY: "Inter_400Regular",

  WEIGHT_MEDIUM: "Inter_500Medium",
  WEIGHT_SEMIBOLD: "Inter_600SemiBold",
  WEIGHT_BOLD: "Inter_700Bold",
  WEIGHT_EXTRABOLD: "Inter_800ExtraBold",
};

const darkTheme = {
  ...lightTheme,

  SECONDARY: "#232222",

  MENU_ITEM_COLOR: "#FFFFFF",
  TAB_ITEM_COLOR: "#3F3F3F",

  BG_COLOR: "#2A2A2A",
  TEXT_COLOR: "#FFFFFF",
};

export { lightTheme, darkTheme };
