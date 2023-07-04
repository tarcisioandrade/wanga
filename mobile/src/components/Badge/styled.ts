import styled, { css } from "styled-components/native";
import { BadgeProps } from ".";
import { phs } from "src/utils/metrics";

export const BadgeContainer = styled.View<
  Pick<BadgeProps, "type" | "bg" | "width">
>`
  background-color: ${(props) =>
    props.type === "Outlined"
      ? props.theme.TAB_ITEM_COLOR
      : props.theme[props.bg || "PRIMARY"]};
  padding: 4px 10px;
  border-radius: 4px;
  align-self: flex-start;

  ${(props) =>
    props.width &&
    css`
      width: ${phs(props.width)};
    `}
`;

export const BadgeText = styled.Text<Pick<BadgeProps, "type" | "bg">>`
  color: ${(props) =>
    props.type === "Outlined" ? props.theme.TEXT_COLOR : props.theme.WHITE};
  font-size: ${(props) => props.theme.FONT_4XS};
  text-align: center;
`;
