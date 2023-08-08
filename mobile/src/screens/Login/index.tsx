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
import Icon from "src/components/Icon";
import { useTheme } from "styled-components";
import Button from "src/components/Button";
import { RootStackScreenProps } from "src/@types/navigation";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "./hooks/useAuth";
import { ActivityIndicator, TouchableNativeFeedback } from "react-native";
import { useThemeMode } from "src/contexts/ThemeContext";
import Modal from "src/components/Modal";
import { useFirstAccess } from "./hooks/useFirstAccess";
import { KeyboardAvoidingView, Pressable, View } from "react-native";

const SigninSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(6, "A senha dever conter no mínimo 6 caracteres"),
});

export type SigninUser = z.infer<typeof SigninSchema>;

const Login = ({ navigation }: RootStackScreenProps<"login">) => {
  const [hidePassword, setHidePassword] = useState(true);
  const theme = useTheme();
  const { theme: themeMode } = useThemeMode();
  const { close, dispatchModal, isFirstAccess, state } = useFirstAccess();

  const { signin, signInWithGoogle, isGoogleSigninLoading, isLoading } =
    useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninUser>({
    resolver: zodResolver(SigninSchema),
  });

  const goToForgoutPasswordScreen = () => {
    navigation.navigate("forgotPassword");
  };

  const goToRegisterScreen = () => {
    navigation.navigate("register");
  };

  const onSubmit = (data: SigninUser) => {
    signin(data);
  };

  return (
    <>
      <Header
        backShow
        title="Entre na sua conta"
        backArrowCallback={isFirstAccess ? dispatchModal : undefined}
      />
      <Layout>
        <KeyboardAvoidingView>
          <Container>
            <View style={{ justifyContent: "flex-end" }}>
              <S.Intro>
                <Logo width={75} height={75} />
              </S.Intro>
              <S.FormContainer>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      IconSVG={EmailIcon}
                      placeholder="example@email.com"
                      keyboardType="email-address"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      isError={!!errors["email"]}
                    />
                  )}
                  name="email"
                />
                {errors["email"] && (
                  <Text size="FONT_2XS" color="RED_500">
                    {errors["email"].message}
                  </Text>
                )}
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      IconSVG={PasswordIcon}
                      secureTextEntry={hidePassword}
                      placeholder="Senha"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      isError={!!errors["password"]}
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
                  )}
                  name="password"
                />
                {errors["password"] && (
                  <Text size="FONT_2XS" color="RED_500">
                    {errors["password"].message}
                  </Text>
                )}
                <S.ForgoutPassword onPress={goToForgoutPasswordScreen}>
                  <Text
                    size="FONT_3XS"
                    color={themeMode.type === "dark" ? "WHITE" : "PRIMARY"}
                  >
                    Esqueceu a senha?
                  </Text>
                </S.ForgoutPassword>
              </S.FormContainer>
              <S.ButtonsContainer>
                <Button
                  title="Login"
                  onPress={handleSubmit(onSubmit)}
                  loading={isLoading}
                />
                <Button
                  title="Cadastre-se"
                  type="outline"
                  onPress={goToRegisterScreen}
                />
              </S.ButtonsContainer>
              <S.Separate />
              <TouchableNativeFeedback
                onPress={signInWithGoogle}
                disabled={isGoogleSigninLoading}
              >
                <S.GoogleButton>
                  {isGoogleSigninLoading ? (
                    <ActivityIndicator color={theme.PRIMARY} />
                  ) : (
                    <>
                      <Icon icon={GoogleIcon} type="fill" />
                      <Text size="FONT_MD" weight="WEIGHT_SEMIBOLD">
                        Entra com o Google
                      </Text>
                    </>
                  )}
                </S.GoogleButton>
              </TouchableNativeFeedback>
            </View>
          </Container>
        </KeyboardAvoidingView>
      </Layout>

      <Modal.Root isOpen={state} onClose={close}>
        <Modal.Header>Faça o Login</Modal.Header>
        <Modal.Content>
          <Text>
            Faça login no app para ter acesso a todas as nossas funcionalidades!
          </Text>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};

export default Login;
