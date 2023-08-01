import React, { ReactNode } from "react";
import * as S from "./styled";
import { useTheme } from "styled-components";
import {
  ActivityIndicator,
  TouchableNativeFeedbackProps,
  TouchableNativeFeedback,
} from "react-native";

export type ButtonProps = TouchableNativeFeedbackProps & {
  title: string;
  type?: "fill" | "outline";
  loading?: boolean;
};

const Button = ({ type = "fill", title, loading, ...props }: ButtonProps) => {
  const theme = useTheme();
  return (
    <TouchableNativeFeedback disabled={loading} {...props}>
      <S.ButtonContainer type={type}>
        {loading ? (
          <ActivityIndicator
            color={type === "outline" ? theme.PRIMARY : theme.WHITE}
          />
        ) : (
          <S.ButtonText type={type}>{title}</S.ButtonText>
        )}
      </S.ButtonContainer>
    </TouchableNativeFeedback>
  );
};

export default Button;
