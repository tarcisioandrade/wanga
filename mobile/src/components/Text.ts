import styled from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

export type CustomTextProps = {
  color?: keyof DefaultTheme | null;
  size?: keyof Pick<
    DefaultTheme,
    "FONT_BASE" | "FONT_MD" | "FONT_LG" | "FONT_SM" | "FONT_XS" | "FONT_XXS"
  >;
  weight?: keyof Pick<
    DefaultTheme,
    "WEIGHT_BOLD" | "WEIGHT_MEDIUM" | "WEIGHT_SEMIBOLD" | "WEIGHT_EXTRABOLD"
  >;
};

export const Text = styled.Text<CustomTextProps>`
  color: ${({ color, theme }) => (color ? theme[color] : theme.TEXT_COLOR)};
  font-family: ${({ weight, theme }) =>
    weight ? theme[weight] : theme.FONT_FAMILY};
  font-size: ${({ size, theme }) => (size ? theme[size] : theme.FONT_BASE)};
`;
