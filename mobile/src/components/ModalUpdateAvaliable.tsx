import React from "react";
import Modal from "./Modal";
import { Linking, Pressable, ToastAndroid } from "react-native";
import { Text } from "./Text";
import { WANGA_SITE } from "src/constants/socialNetworks";

type Props = {
  hasUpdate: boolean;
  close: () => void;
};

const ModalUpdateAvaliable = ({ hasUpdate, close }: Props) => {
  const goToDownloadPage = async () => {
    const canOpenURL = await Linking.canOpenURL(WANGA_SITE);
    if (canOpenURL) {
      Linking.openURL(WANGA_SITE);
    } else {
      ToastAndroid.show(
        "Não foi possivel realizar esta ação",
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <Modal.Root onClose={close} isOpen={hasUpdate}>
      <Modal.Header>Atualização Disponivel</Modal.Header>
      <Modal.Content>
        <Text>
          Uma atualização está disponivel para o app. Por favor, baixe no nosso
          site oficial.
        </Text>
      </Modal.Content>
      <Modal.Footer>
        <Pressable onPress={close}>
          <Text>Cancelar</Text>
        </Pressable>
        <Pressable onPress={goToDownloadPage}>
          <Text>Atualizar</Text>
        </Pressable>
      </Modal.Footer>
    </Modal.Root>
  );
};

export default ModalUpdateAvaliable;
