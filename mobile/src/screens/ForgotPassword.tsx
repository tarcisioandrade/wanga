import { View, KeyboardAvoidingView } from "react-native";
import React from "react";
import Header from "src/components/Header";
import { Container, Layout, Stack } from "src/components/Layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as S from "./Login/styled";
import Logo from "assets/logo.svg";
import EmailIcon from "assets/svg-icon/email.svg";
import { Text } from "src/components/Text";
import Input from "src/components/Input";
import Button from "src/components/Button";

const ForgotPasswordSchema = z.object({
  email: z
    .string({
      errorMap: () => ({
        message: "Este campo é obrigatório",
      }),
    })
    .email({ message: "E-mail inválido" }),
});

type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;

const ForgotPassword = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPassword) => {
    console.log("data", data);
  };

  return (
    <>
      <Header backShow title="Esqueci minha senha" />
      <Layout>
        <KeyboardAvoidingView>
          <Container>
            <View style={{ justifyContent: "flex-end" }}>
              <Stack mt={90} gap={48} mb={20}>
                <S.Intro>
                  <Logo width={75} height={75} />
                </S.Intro>
                <View>
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
                </View>
              </Stack>
              <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
            </View>
          </Container>
        </KeyboardAvoidingView>
      </Layout>
    </>
  );
};

export default ForgotPassword;
