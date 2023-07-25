import { Pressable, TextInputProps, TextInput } from "react-native";
import React, { Ref } from "react";
import * as S from "./styled";
import Icon from "../Icon";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components";

export type InputProps = TextInputProps & {
  IconSVG: React.FC<SvgProps>;
  iconType?: "fill" | "stroke";
  children?: React.ReactNode;
  isError?: boolean;
};

const Input = React.forwardRef(
  (
    { IconSVG, children, isError, iconType = "fill", ...props }: InputProps,
    ref: Ref<TextInput>
  ) => {
    const theme = useTheme();

    return (
      <S.InputContainer isError={isError}>
        <Icon
          icon={IconSVG}
          type={iconType}
          color={isError ? theme.RED_500 : theme.GRAY_600}
          size={19}
        />
        <S.InputElement
          ref={ref}
          {...props}
          placeholderTextColor={theme.GRAY_600}
        />
        {children}
      </S.InputContainer>
    );
  }
);

export default Input;
