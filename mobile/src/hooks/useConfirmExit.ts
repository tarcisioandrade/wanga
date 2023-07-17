import { useEffect } from "react";
import { Alert, BackHandler } from "react-native";

export const useConfirmExit = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Tá cedo ainda 🥺", "Tem certeza que quer sair?", [
        {
          text: "Não",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Sim", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
};
