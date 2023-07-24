import React, { useState } from "react";
import { Container, Layout } from "src/components/Layout";
import Header from "src/components/Header";
import Logo from "assets/logo.svg";
import * as S from "./styled";
import { Text } from "src/components/Text";
import EmailIcon from "assets/svg-icon/email.svg";
import PasswordIcon from "assets/svg-icon/password.svg";
import EyeHideIcon from "assets/svg-icon/eye-hide.svg";
import GoogleIcon from "assets/svg-icon/google-icon.svg";

import Input from "src/components/Input";
import { KeyboardAvoidingView, Pressable, View } from "react-native";
import Icon from "src/components/Icon";
import { useTheme } from "styled-components";
import Button from "src/components/Button";
import { RootStackScreenProps } from "src/@types/navigation";

const Login = ({ navigation }: RootStackScreenProps<"login">) => {
  const [hidePassword, setHidePassword] = useState(true);
  const theme = useTheme();

  const goToForgoutPasswordScreen = () => {
    console.log("Password");
  };

  const goToRegisterScreen = () => {
    navigation.navigate("register");
  };

  return (
    <>
      <Header backShow title="Entre na sua conta" />
      <Layout>
        <KeyboardAvoidingView>
          <Container>
            <View style={{ justifyContent: "flex-end" }}>
              <S.Intro>
                <Logo width={75} height={75} />
              </S.Intro>
              <S.FormContainer>
                <Input
                  IconSVG={EmailIcon}
                  placeholder="example@email.com"
                  keyboardType="email-address"
                />
                <Input
                  IconSVG={PasswordIcon}
                  secureTextEntry={hidePassword}
                  placeholder="Senha"
                >
                  <Pressable onPress={() => setHidePassword(!hidePassword)}>
                    <Icon
                      icon={EyeHideIcon}
                      type="fill"
                      size={24}
                      color={theme.GRAY_600}
                    />
                  </Pressable>
                </Input>
                <S.ForgoutPassword onPress={goToForgoutPasswordScreen}>
                  <Text size="FONT_3XS" color="PRIMARY">
                    Esqueceu a senha?
                  </Text>
                </S.ForgoutPassword>
              </S.FormContainer>
              <S.ButtonsContainer>
                <Button title="Login" />
                <Button
                  title="Cadastre-se"
                  type="outline"
                  onPress={goToRegisterScreen}
                />
              </S.ButtonsContainer>
              <S.Separate />
              <S.GoogleButton>
                <Icon icon={GoogleIcon} type="fill" />
                <Text size="FONT_MD" weight="WEIGHT_SEMIBOLD">
                  Entra com o Google
                </Text>
              </S.GoogleButton>
            </View>
          </Container>
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};

export default Login;
