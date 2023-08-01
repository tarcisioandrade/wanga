import { useNavigation } from "@react-navigation/native";
import { isAxiosError } from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { signinApi, signinGoogleApi } from "src/api/wangaServices";
import { useUser } from "src/contexts/UserContext";
import { ToastAndroid } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { SigninUser } from "..";
import Toast from "react-native-toast-message";
import {
  GoogleSignin,
  statusCodes,
  NativeModuleError,
} from "@react-native-google-signin/google-signin";

export type SigninGoogleInput = {
  id_google: string;
  name: string | null;
  email: string;
};

export const useAuth = () => {
  const [isGoogleSigninLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { setUserInLocalStorage } = useUser();

  const welcomeUser = (userName: string) => {
    Toast.show({
      type: "info",
      text1: `Bem Vindo, ${userName}-senpai`,
      topOffset: 80,
    });
  };

  const { isLoading, mutate } = useMutation({
    mutationFn: (user: SigninUser) => signinApi(user),
    onSuccess: (data) => {
      setUserInLocalStorage(data).then(() => {
        navigation.navigate("home");
        welcomeUser(data.name);
      });
    },
    onError(error) {
      if (isAxiosError(error) && error.response?.status === 401) {
        ToastAndroid.show("Email ou senha incorreto.", ToastAndroid.BOTTOM);
      }
    },
  });

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      await GoogleSignin.hasPlayServices();
      const {
        user: { email, id, givenName },
      } = await GoogleSignin.signIn();
      const wangaUser = await signinGoogleApi({
        email,
        id_google: id,
        name: givenName,
      });
      setUserInLocalStorage(wangaUser);
      navigation.navigate("home");
      welcomeUser(wangaUser.name);
    } catch (error) {
      if (isAxiosError(error)) {
        await GoogleSignin.revokeAccess();
        Alert.alert(
          "Falha no Servidor",
          `Algo aconteceu, por favor, tente novamente mais tarde.`
        );
        return;
      }

      const typedError = error as NativeModuleError;

      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          ToastAndroid.show("Processo Cancelado.", ToastAndroid.BOTTOM);
          break;
        case statusCodes.IN_PROGRESS:
          Alert.alert("Status", "Em progresso...");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert(
            "Error",
            "Google Play Services não está disponivel neste dispositivo."
          );
          break;
        case "7":
          Alert.alert("Falha na conexão", "Você está sem internet.");
          break;
        default:
          Alert.alert(
            "Algo deu errado!",
            "Reinicie o aplicativo ou tente novamente mais tarde"
          );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signin = (data: SigninUser) => {
    mutate(data);
  };

  return { isGoogleSigninLoading, signInWithGoogle, signin, isLoading };
};
