import { TextInput } from "react-native";
import { pvs } from "src/utils/metrics";
import styled from "styled-components/native";
import { InputProps } from ".";

export const InputContainer = styled.View<Pick<InputProps, "isError">>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  gap: 12px;
  height: ${pvs(49)};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ isError, theme }) =>
    isError ? theme.RED_500 : theme.GRAY_600};
`;

export const InputElement = styled(TextInput)`
  flex: 1;
  color: ${(props) => props.theme.TEXT_COLOR};
`;
