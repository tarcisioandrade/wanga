import { TouchableOpacityProps } from "react-native";
import React from "react";
import { ButtonText, PrimaryButton } from "./styles";

type Props = TouchableOpacityProps & {
  children: React.ReactNode;
};

const Button = ({ children, ...rest }: Props) => {
  return (
    <PrimaryButton {...rest}>
      <ButtonText>{children}</ButtonText>
    </PrimaryButton>
  );
};

export default Button;
