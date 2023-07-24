import { Alert, Linking, Share } from "react-native";
import React from "react";
import CustomPressable from "./CustomPressable";
import Icon from "./Icon";
import { Stack } from "./Layout";
import Modal from "./Modal";
import SettingsIcon from "assets/svg-icon/settings.svg";
import AboutIcon from "assets/svg-icon/about.svg";
import FeedbackIcon from "assets/svg-icon/feedback.svg";
import { WANGA_EMAIL } from "src/constants/socialNetworks";
import { useNavigation } from "@react-navigation/native";
import { Text } from "./Text";
import ShareIcon from "assets/svg-icon/share.svg";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const onShare = async () => {
  try {
    await Share.share({
      message:
        "Você gosta de ler mangás, novels ou manhuas? Confira o app Wanga https://www.google.com.br",
    });
  } catch (error) {
    throw error;
  }
};

const onEmail = async () => {
  const url = `mailto:${WANGA_EMAIL}?subject=Wanga Feedback`;
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    Alert.alert(`Não foi possivel concluir esta ação.`);
  }
};
const ModalOptions = ({ isOpen, onClose }: Props) => {
  const navigation = useNavigation();

  const goToAboutScreen = () => {
    onClose();
    navigation.navigate("about");
  };

  const goToSettingsScreen = () => {
    onClose();
    navigation.navigate("settings");
  };

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header>Opções</Modal.Header>
      <Modal.Content>
        <Stack gap={25} my={12}>
          <CustomPressable
            style={{ width: "100%" }}
            radius={8}
            onPress={goToSettingsScreen}
          >
            <Stack direction="row" align_items="center" gap={16}>
              <Icon icon={SettingsIcon} type="fill" />
              <Text size="FONT_XS">Configurações</Text>
            </Stack>
          </CustomPressable>
          <CustomPressable
            style={{ width: "100%" }}
            radius={8}
            onPress={onEmail}
          >
            <Stack direction="row" align_items="center" gap={16}>
              <Icon icon={FeedbackIcon} type="fill" />
              <Text size="FONT_XS">Feedback</Text>
            </Stack>
          </CustomPressable>
          <CustomPressable
            style={{ width: "100%" }}
            radius={8}
            onPress={onShare}
          >
            <Stack direction="row" align_items="center" gap={16}>
              <Icon icon={ShareIcon} type="fill" />
              <Text size="FONT_XS">Compartilhar App</Text>
            </Stack>
          </CustomPressable>
          <CustomPressable
            style={{ width: "100%" }}
            radius={8}
            onPress={goToAboutScreen}
          >
            <Stack direction="row" align_items="center" gap={16}>
              <Icon icon={AboutIcon} type="fill" />
              <Text size="FONT_XS">Sobre</Text>
            </Stack>
          </CustomPressable>
        </Stack>
      </Modal.Content>
    </Modal.Root>
  );
};

export default ModalOptions;
