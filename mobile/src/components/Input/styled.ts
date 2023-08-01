import { TextInput } from "react-native";
import { pvs } from "src/utils/metrics";
import styled from "styled-components/native";
import { InputProps } from ".";

type Props = Pick<InputProps, "isError"> & {
  focused: boolean;
};

export const InputContainer = styled.View<Props>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  gap: 12px;
  height: ${pvs(49)};
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ isError, theme, focused }) =>
    isError ? theme.RED_500 : focused ? theme.PRIMARY : theme.GRAY_600};
`;

export const InputElement = styled(TextInput)`
  flex: 1;
  color: ${(props) => props.theme.TEXT_COLOR};
`;
