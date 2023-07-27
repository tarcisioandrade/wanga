import {
  GoogleSignin,
  statusCodes,
  NativeModuleError,
} from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { isAxiosError } from "axios";
import { useState } from "react";
import { Alert } from "react-native";
import { signinApi, signinGoogleApi } from "src/api/wangaServices";
import { useUser } from "src/contexts/UserContext";
import { ToastAndroid } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { SigninUser } from "..";

export type SigninGoogleInput = {
  id_google: string;
  name: string | null;
  email: string;
};

export const useAuth = () => {
  const [isGoogleSigninLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { setUserInLocalStorage } = useUser();

  GoogleSignin.configure({
    scopes: ["email"],
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
  });

  const { isLoading, mutate } = useMutation({
    mutationFn: (user: SigninUser) => signinApi(user),
    onSuccess: (data) => {
      setUserInLocalStorage(data).then(() => {
        navigation.navigate("home");
      });
      ToastAndroid.show(`Bem Vindo, ${data.name}-senpai`, ToastAndroid.TOP);
    },
    onError(error) {
      console.log(JSON.stringify(error, null, 2));
      ToastAndroid.show("Email ou senha incorreto.", ToastAndroid.TOP);
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
      ToastAndroid.show(
        `Bem Vindo, ${wangaUser.name}-senpai`,
        ToastAndroid.TOP
      );
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
          Alert.alert("Processo Cancelado.");
          break;
        case statusCodes.IN_PROGRESS:
          Alert.alert("Em progresso...");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          Alert.alert(
            "Google Play Services não está disponivel neste dispositivo."
          );
          break;
        case "7":
          Alert.alert("Você está sem internet.");
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
