import React, { useState } from "react";
import { Container, Layout } from "src/components/Layout";
import Header from "src/components/Header";
import EmailIcon from "assets/svg-icon/email.svg";
import UserIcon from "assets/svg-icon/user.svg";
import PasswordIcon from "assets/svg-icon/password.svg";
import EyeHideIcon from "assets/svg-icon/eye-hide.svg";
import Logo from "assets/logo.svg";
import * as S from "./styled";
import { z } from "zod";
import Input from "src/components/Input";
import Icon from "src/components/Icon";
import { useTheme } from "styled-components";
import Button from "src/components/Button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from "src/components/Text";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "src/api/wangaServices";
import { RootStackScreenProps } from "src/@types/navigation";
import {
  KeyboardAvoidingView,
  Pressable,
  ToastAndroid,
  View,
} from "react-native";

const SignupSchema = z
  .object({
    name: z
      .string()
      .min(2)
      .max(25)
      .refine((value) => !/\s/.test(value), {
        message: "O nome de usuário não pode conter espaços.",
      }),
    email: z.string().email({ message: "E-mail inválido" }),
    password: z.string().min(6, "A senha dever conter no mínimo 6 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export type SignupUser = z.infer<typeof SignupSchema>;

const Register = ({ navigation }: RootStackScreenProps<"register">) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupUser>({
    resolver: zodResolver(SignupSchema),
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (user: SignupUser) => createUser(user),
    onError: () => {
      ToastAndroid.show("Usuario já cadastrado", ToastAndroid.TOP);
    },
    onSuccess: () => {
      ToastAndroid.show("Cadastro realizado com sucesso!", ToastAndroid.TOP);
      navigation.navigate("login");
    },
  });

  const onSubmit = (data: SignupUser) => {
    mutate(data);
  };

  return (
    <>
      <Header backShow title="Cadastro" />
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
                      IconSVG={UserIcon}
                      iconType="stroke"
                      placeholder="Nome de Exibição"
                      keyboardType="default"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      isError={!!errors["name"]}
                    />
                  )}
                  name="name"
                />
                {errors["name"] && (
                  <Text size="FONT_2XS" color="RED_500">
                    {errors["name"].message}
                  </Text>
                )}
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
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      IconSVG={PasswordIcon}
                      secureTextEntry={hideConfirmPassword}
                      placeholder="Confirme sua Senha"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      isError={!!errors["confirmPassword"]}
                    >
                      <Pressable
                        onPress={() =>
                          setHideConfirmPassword(!hideConfirmPassword)
                        }
                      >
                        <Icon
                          icon={EyeHideIcon}
                          type="fill"
                          size={24}
                          color={theme.GRAY_600}
                        />
                      </Pressable>
                    </Input>
                  )}
                  name="confirmPassword"
                />
                {errors["confirmPassword"] && (
                  <Text size="FONT_2XS" color="RED_500">
                    {errors["confirmPassword"].message}
                  </Text>
                )}
              </S.FormContainer>
              <Button
                title="Cadastrar"
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
              />
            </View>
          </Container>
        </KeyboardAvoidingView>
        {/*Area das politicas de privacidade caso precise. */}

        {/* <S.PoliciesContainer>
          <Text style={{ textAlign: "center" }} size="FONT_2XS">
            Ao tocar em cadastar, representa que você esta de acordo com os
            nossos{" "}
            <Text
              color="PRIMARY"
              size="FONT_2XS"
              style={{ textDecorationLine: "underline" }}
            >
              Termos de Uso
            </Text>{" "}
            e a{" "}
            <Text
              color="PRIMARY"
              size="FONT_2XS"
              style={{ textDecorationLine: "underline" }}
            >
              Política de Privacidade
            </Text>
            .
          </Text>
        </S.PoliciesContainer> */}
      </Layout>
    </>
  );
};

export default Register;
