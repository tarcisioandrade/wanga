import { TextInput } from "react-native";
import { Text } from "src/components/Text";
import { pvs } from "src/utils/metrics";
import styled, { css } from "styled-components/native";

export const Intro = styled.View`
  margin-top: ${pvs(40)};
  align-items: center;
`;

export const FormContainer = styled.View`
  margin-top: ${pvs(40)};
  gap: 14px;
`;

export const ForgoutPassword = styled.Pressable.attrs({
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
})`
  align-self: flex-end;
`;

export const ButtonsContainer = styled.View`
  gap: 12px;
  margin-top: ${pvs(20)};
`;

export const Separate = styled.View`
  border-bottom-width: 1px;
  border-color: ${(props) => props.theme.SKELETON_COLOR};
  margin: ${pvs(30)} 0;
`;

export const GoogleButton = styled.Pressable`
  height: ${pvs(49)};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${(props) => props.theme.SKELETON_COLOR};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
