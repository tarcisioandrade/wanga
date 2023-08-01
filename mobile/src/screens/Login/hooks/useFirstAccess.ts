import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { BackHandler } from "react-native";
import { useDisclose } from "src/hooks/useDisclose";

export const useFirstAccess = () => {
  const [isFirstAccess, setIsFirstAccess] = useState(false);
  const { open, close, state } = useDisclose(false);

  const getFirstAccess = () => {
    AsyncStorage.getItem("@first-access-login").then((value) =>
      setIsFirstAccess(!value)
    );
  };

  const dispatchModal = () => {
    if (isFirstAccess) {
      open();
      AsyncStorage.setItem("@first-access-login", JSON.stringify(true));
      setIsFirstAccess(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getFirstAccess();
      const backAction = () => {
        if (isFirstAccess) {
          dispatchModal();
          return true;
        } else {
          return false;
        }
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [isFirstAccess])
  );

  return { isFirstAccess, state, close, dispatchModal };
};
