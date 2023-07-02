import { pms } from "src/utils/metrics";
import styled, { css } from "styled-components/native";
import { DefaultTheme } from "styled-components/native";

export type CustomTextProps = {
  color?: keyof DefaultTheme | null;
  size?: keyof Pick<
    DefaultTheme,
    | "FONT_BASE"
    | "FONT_MD"
    | "FONT_LG"
    | "FONT_SM"
    | "FONT_XS"
    | "FONT_2XS"
    | "FONT_3XS"
    | "FONT_4XS"
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
  letter-spacing: -0.32px;
  line-height: ${pms(21)};

  ${(props) =>
    props.size === "FONT_4XS" &&
    css`
      line-height: ${pms(13)};
      letter-spacing: 0.07px;
    `}

  ${(props) =>
    props.size === "FONT_3XS" &&
    css`
      line-height: ${pms(16)};
    `}

    ${(props) =>
    props.size === "FONT_2XS" &&
    css`
      line-height: ${pms(18)};
      letter-spacing: 0.08px;
    `}

  ${(props) =>
    props.size === "FONT_SM" &&
    css`
      line-height: ${pms(20)};
      letter-spacing: 0.24px;
    `}

    ${(props) =>
    props.size === "FONT_BASE" &&
    css`
      line-height: ${pms(21)};
      letter-spacing: -0.32px;
    `}

    
    ${(props) =>
    props.size === "FONT_MD" &&
    css`
      line-height: ${pms(22)};
      letter-spacing: -0.41px;
    `}

    ${(props) =>
    props.size === "FONT_LG" &&
    css`
      line-height: ${pms(22)};
      letter-spacing: -0.41px;
    `}
`;
