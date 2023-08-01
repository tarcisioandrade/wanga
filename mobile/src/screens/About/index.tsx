import React from "react";
import { Layout, ScrollContainer, Stack } from "src/components/Layout";
import Header from "src/components/Header";
import Logo from "assets/logo.svg";
import { Text } from "src/components/Text";
import * as S from "./styled";
import ArrowRightLight from "assets/svg-icon/arrow-right-iconly.svg";
import Icon from "src/components/Icon";
import { RefreshControl, Linking, ToastAndroid } from "react-native";
import { useTheme } from "styled-components";
import { useState } from "react";
import {
  WANGA_EMAIL,
  WANGA_FACEBOOK,
  WANGA_INSTAGRAM,
} from "src/constants/socialNetworks";

const About = () => {
  const [checking, setChecking] = useState(false);
  const theme = useTheme();

  const checkUpdateVersion = () => {
    setChecking(true);

    setTimeout(() => setChecking(false), 3000);
    ToastAndroid.show("Seu app está atualizado", ToastAndroid.BOTTOM);
  };

  const goToEmail = async () => {
    const URL = `mailto:${WANGA_EMAIL}?subject=Wanga`;
    const validate = await Linking.canOpenURL(URL);

    if (validate) {
      await Linking.openURL(URL);
    } else {
      ToastAndroid.show(
        "Não foi possivel realizar esta ação.",
        ToastAndroid.BOTTOM
      );
    }
  };
  const goToFacebook = () => {};
  const goToInstagram = () => {};

  // TODO: Linkar o email, facebook etc, para abrir na pagina.
  // TODO: Criar modal informando que tem atualização e enviando para o site.
  return (
    <Layout>
      <Header backShow title="Sobre" />
      <ScrollContainer
        refreshControl={
          <RefreshControl refreshing={checking} enabled={checking} />
        }
      >
        <Stack justify_content="center" align_items="center" mt={50} gap={16}>
          <Logo />
          <Text size="FONT_3XS">v1.2.3-alpha</Text>
        </Stack>

        <Stack mt={40}>
          <S.AboutItem
            style={({ pressed }) => ({
              backgroundColor: pressed ? theme.SKELETON_COLOR : "transparent",
            })}
            onPress={goToEmail}
          >
            <S.AboutWrapper>
              <S.AboutText>E-mail</S.AboutText>
              <S.AboutTextWithArrow>
                <S.AboutText color="GRAY_600">{WANGA_EMAIL}</S.AboutText>
                <Icon
                  icon={ArrowRightLight}
                  type="stroke"
                  color={theme.GRAY_600}
                  size={18}
                />
              </S.AboutTextWithArrow>
            </S.AboutWrapper>
          </S.AboutItem>

          <S.AboutItem
            style={({ pressed }) => ({
              backgroundColor: pressed ? theme.SKELETON_COLOR : "transparent",
            })}
            onPress={goToFacebook}
          >
            <S.AboutWrapper>
              <S.AboutText>Facebook</S.AboutText>
              <S.AboutTextWithArrow>
                <S.AboutText color="GRAY_600">{WANGA_FACEBOOK}</S.AboutText>
                <Icon
                  icon={ArrowRightLight}
                  type="stroke"
                  color={theme.GRAY_600}
                  size={18}
                />
              </S.AboutTextWithArrow>
            </S.AboutWrapper>
          </S.AboutItem>

          <S.AboutItem
            style={({ pressed }) => ({
              backgroundColor: pressed ? theme.SKELETON_COLOR : "transparent",
            })}
            onPress={goToInstagram}
          >
            <S.AboutWrapper>
              <S.AboutText>Instagram</S.AboutText>
              <S.AboutTextWithArrow>
                <S.AboutText color="GRAY_600">{WANGA_INSTAGRAM}</S.AboutText>
                <Icon
                  icon={ArrowRightLight}
                  type="stroke"
                  color={theme.GRAY_600}
                  size={18}
                />
              </S.AboutTextWithArrow>
            </S.AboutWrapper>
          </S.AboutItem>

          <S.AboutItem
            style={({ pressed }) => ({
              backgroundColor: pressed ? theme.SKELETON_COLOR : "transparent",
              borderBottomColor: "transparent",
            })}
            onPress={checkUpdateVersion}
          >
            <S.AboutWrapper>
              <S.AboutText>Proucurar Atualização</S.AboutText>
              <S.AboutText>
                <Icon
                  icon={ArrowRightLight}
                  type="stroke"
                  color={theme.GRAY_600}
                  size={18}
                />
              </S.AboutText>
            </S.AboutWrapper>
          </S.AboutItem>
        </Stack>
      </ScrollContainer>
    </Layout>
  );
};

export default About;
