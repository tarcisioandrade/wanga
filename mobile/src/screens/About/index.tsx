import React from "react";
import { Layout, ScrollContainer, Stack } from "src/components/Layout";
import Header from "src/components/Header";
import Logo from "assets/logo.svg";
import { Text } from "src/components/Text";
import { WANGA_EMAIL } from "src/constants/wangaEmail";
import * as S from "./styled";
import ArrowRightLight from "assets/svg-icon/arrow-right-iconly.svg";
import Icon from "src/components/Icon";
import { Pressable, RefreshControl } from "react-native";
import { useTheme } from "styled-components";
import { useState } from "react";

const About = () => {
  const [checking, setChecking] = useState(false);
  const theme = useTheme();

  const checkUpdateVersion = () => {
    setChecking(true);

    setTimeout(() => setChecking(false), 3000);
  };

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
          <S.AboutItem>
            <S.AboutText>E-mail</S.AboutText>
            <S.AboutText color="GRAY_600">{WANGA_EMAIL}</S.AboutText>
          </S.AboutItem>

          <S.AboutItem>
            <S.AboutText>Facebook</S.AboutText>
            <S.AboutText color="GRAY_600">@wanganoface</S.AboutText>
          </S.AboutItem>

          <S.AboutItem>
            <S.AboutText>Instagram</S.AboutText>
            <S.AboutText color="GRAY_600">@wanganoinsta</S.AboutText>
          </S.AboutItem>
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: pressed ? theme.SKELETON_COLOR : "transparent",
            })}
            onPress={checkUpdateVersion}
          >
            <S.AboutItem style={{ borderBottomColor: "transparent" }}>
              <S.AboutText>Proucurar Atualização</S.AboutText>
              <S.AboutText>
                <Icon
                  icon={ArrowRightLight}
                  type="stroke"
                  color={theme.GRAY_600}
                  size={18}
                />
              </S.AboutText>
            </S.AboutItem>
          </Pressable>
        </Stack>
      </ScrollContainer>
    </Layout>
  );
};

export default About;
