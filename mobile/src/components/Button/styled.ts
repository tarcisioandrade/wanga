import styled, { css } from "styled-components/native";
import { Text } from "../Text";
import { pvs } from "src/utils/metrics";
import { ButtonProps } from ".";

export const ButtonContainer = styled.View<
  Pick<ButtonProps, "type" | "disabled">
>`
  background-color: ${({ theme, type = "fill" }) =>
    type === "fill" ? theme.PRIMARY : "transparent"};
  height: ${pvs(49)};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  ${(props) =>
    props.type === "outline" &&
    css`
      border-width: 1px;
      border-color: ${(props) => props.theme.SKELETON_COLOR};
    `}
`;

export const ButtonText = styled(Text).attrs({
  size: "FONT_MD",
  weight: "WEIGHT_SEMIBOLD",
})<Pick<ButtonProps, "type">>`
  color: ${({ theme, type = "fill" }) =>
    type === "fill" ? theme.WHITE : theme.TEXT_COLOR};
`;
