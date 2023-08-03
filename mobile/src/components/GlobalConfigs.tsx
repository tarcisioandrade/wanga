import React, { ReactNode, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { useThemeMode } from "src/contexts/ThemeContext";
import { darkTheme, lightTheme } from "src/theme";
import { StatusBar } from "expo-status-bar";
import LoadingScreen from "src/screens/LoadingScreen";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useUpdateAvaliable } from "src/hooks/useUpdateAvaliable";
import { useDisclose } from "src/hooks/useDisclose";
import ModalUpdateAvaliable from "./ModalUpdateAvaliable";
import {
  useFonts,
  HankenGrotesk_400Regular,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_500Medium,
  HankenGrotesk_700Bold,
  HankenGrotesk_800ExtraBold,
} from "@expo-google-fonts/hanken-grotesk";

type Props = {
  children: ReactNode;
};

const GlobalConfigs = ({ children }: Props) => {
  const { theme, themeLoaded } = useThemeMode();
  const { handleUpdate } = useUpdateAvaliable();
  const { state, close, open } = useDisclose(false);
  let [fontsLoaded] = useFonts({
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold,
    HankenGrotesk_800ExtraBold,
    BungeeSpice_400Regular: require("assets/font/BungeeSpice-Regular.ttf"),
  });

  GoogleSignin.configure({
    scopes: ["email"],
    webClientId: process.env.GOOGLE_WEB_CLIENT_ID,
    offlineAccess: true,
  });

  const statusStyle = theme.type === "dark" ? "light" : "dark";
  const themeStyle = theme.type === "dark" ? darkTheme : lightTheme;

  useEffect(() => {
    handleUpdate().then((update) => {
      if (update) open();
    });
  }, []);

  const clientLoading = !themeLoaded || !fontsLoaded;

  return (
    <ThemeProvider theme={themeStyle}>
      <StatusBar style={statusStyle} />
      {clientLoading ? <LoadingScreen /> : children}
      <ModalUpdateAvaliable hasUpdate={state} close={close} />
    </ThemeProvider>
  );
};

export default GlobalConfigs;
