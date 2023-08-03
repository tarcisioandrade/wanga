import React from "react";
import { Layout, ScrollContainer, Stack } from "src/components/Layout";
import Header from "src/components/Header";
import Logo from "assets/logo.svg";
import { Text } from "src/components/Text";
import * as S from "./styled";
import ArrowRightLight from "assets/svg-icon/arrow-right-iconly.svg";
import Icon from "src/components/Icon";
import { useTheme } from "styled-components";
import { useUpdateAvaliable } from "src/hooks/useUpdateAvaliable";
import Toast from "react-native-toast-message";
import ModalUpdateAvaliable from "src/components/ModalUpdateAvaliable";
import { useDisclose } from "src/hooks/useDisclose";
import {
  RefreshControl,
  Linking,
  ToastAndroid,
  TouchableNativeFeedback,
} from "react-native";
import {
  WANGA_EMAIL,
  WANGA_FACEBOOK,
  WANGA_INSTAGRAM,
} from "src/constants/socialNetworks";

const About = () => {
  const theme = useTheme();
  const { state, open, close } = useDisclose(false);
  const { loading, handleUpdate, currentClientVersion } = useUpdateAvaliable();

  const checkUpdateVersion = () => {
    handleUpdate()
      .then((update) => {
        if (update) {
          open();
        } else {
          ToastAndroid.show("Seu app está atualizado", ToastAndroid.BOTTOM);
        }
      })
      .catch(() =>
        Toast.show({
          type: "error",
          text1: "Servidor Indisponivel",
          text2: "Por favor, tente novamente.",
          topOffset: 80,
        })
      );
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
  return (
    <Layout>
      <Header backShow title="Sobre" />
      <ScrollContainer
        refreshControl={
          <RefreshControl refreshing={loading} enabled={loading} />
        }
      >
        <Stack justify_content="center" align_items="center" mt={50} gap={16}>
          <Logo />
          <Text size="FONT_3XS">v{currentClientVersion}-alpha</Text>
        </Stack>

        <Stack mt={40}>
          <TouchableNativeFeedback onPress={goToEmail}>
            <S.AboutItem>
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
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={goToFacebook}>
            <S.AboutItem>
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
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={goToInstagram}>
            <S.AboutItem>
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
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={checkUpdateVersion}>
            <S.AboutItem>
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
          </TouchableNativeFeedback>
        </Stack>
      </ScrollContainer>
      <ModalUpdateAvaliable hasUpdate={state} close={close} />
    </Layout>
  );
};

export default About;
