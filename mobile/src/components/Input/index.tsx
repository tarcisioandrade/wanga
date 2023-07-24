import { Pressable, TextInputProps } from "react-native";
import React from "react";
import * as S from "./styled";
import Icon from "../Icon";
import { SvgProps } from "react-native-svg";
import { useTheme } from "styled-components";

type Props = TextInputProps & {
  IconSVG: React.FC<SvgProps>;
  children?: React.ReactNode;
};

const Input = ({ IconSVG, children, ...props }: Props) => {
  const theme = useTheme();

  return (
    <S.InputContainer>
      <Icon icon={IconSVG} type="fill" color={theme.GRAY_600} size={19} />
      <S.InputElement {...props} placeholderTextColor={theme.GRAY_600} />
      {children}
    </S.InputContainer>
  );
};

export default Input;
