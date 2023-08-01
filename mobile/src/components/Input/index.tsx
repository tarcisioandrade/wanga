import { Pressable, TextInputProps, TextInput } from "react-native";
import React, { Ref, useState } from "react";
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
    const [isFocused, setIsFocused] = useState(false);
    const theme = useTheme();

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <S.InputContainer isError={isError} focused={isFocused}>
        <Icon
          icon={IconSVG}
          type={iconType}
          color={
            isError ? theme.RED_500 : isFocused ? theme.PRIMARY : theme.GRAY_600
          }
          size={19}
        />
        <S.InputElement
          ref={ref}
          {...props}
          placeholderTextColor={theme.GRAY_600}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {children}
      </S.InputContainer>
    );
  }
);

export default Input;
