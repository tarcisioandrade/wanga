import styled from "styled-components/native";
import { BadgeProps } from ".";

export const BadgeContainer = styled.View<Pick<BadgeProps, "type">>`
  background-color: ${(props) =>
    props.type === "Outlined" ? props.theme.WHITE : props.theme.PRIMARY};
  padding: 4px 10px;
  border-radius: 4px;
  align-self: flex-start;
`;

export const BadgeText = styled.Text<Pick<BadgeProps, "type">>`
  color: ${(props) => (props.type === "Outlined" ? "#000" : props.theme.WHITE)};
  font-size: ${(props) => props.theme.FONT_4XS};
`;
