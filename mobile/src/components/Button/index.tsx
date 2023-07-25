import {
  View,
  Text,
  ButtonProps as ButtonPropsRN,
  ActivityIndicator,
} from "react-native";
import React, { ReactNode } from "react";
import * as S from "./styled";
import { useTheme } from "styled-components";

export type ButtonProps = ButtonPropsRN & {
  type?: "fill" | "outline";
  loading?: boolean;
};

const Button = ({ type = "fill", title, loading, ...props }: ButtonProps) => {
  const theme = useTheme();
  return (
    <S.ButtonContainer
      type={type}
      {...props}
      disabled={loading}
      style={({ pressed }) => ({
        opacity: pressed ? 0.8 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator
          color={type === "outline" ? theme.PRIMARY : theme.WHITE}
        />
      ) : (
        <S.ButtonText type={type}>{title}</S.ButtonText>
      )}
    </S.ButtonContainer>
  );
};

export default Button;
