import React, { ReactNode, useCallback, useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { useThemeMode } from "src/contexts/ThemeContext";
import { darkTheme, lightTheme } from "src/theme";
import { StatusBar } from "expo-status-bar";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useUpdateAvaliable } from "src/hooks/useUpdateAvaliable";
import { useDisclose } from "src/hooks/useDisclose";
import ModalUpdateAvaliable from "./ModalUpdateAvaliable";
import * as SplashScreen from "expo-splash-screen";
import { useAdsConfig } from "src/hooks/useAdsConfig";
import { Layout } from "./Layout";
import { useInterstitialAds } from "src/contexts/AdsContext";
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

SplashScreen.preventAutoHideAsync();

const GlobalConfigs = ({ children }: Props) => {
  const { theme, themeLoaded } = useThemeMode();
  const { handleUpdate } = useUpdateAvaliable();
  const { state, close, open } = useDisclose(false);
  const { initialize, adsLoading } = useAdsConfig();
  const { loadInterstitial } = useInterstitialAds();

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
    // Inicia o ADS
    initialize();

    // Carrega o Interstitial Ads
    const unsubscribe = loadInterstitial();

    return () => unsubscribe();
  }, []);

  const clientLoading = !themeLoaded || !fontsLoaded || adsLoading;

  const onLayoutRootView = useCallback(async () => {
    if (!clientLoading) await SplashScreen.hideAsync();
  }, [clientLoading]);

  if (clientLoading) return null;
  return (
    <ThemeProvider theme={themeStyle}>
      <StatusBar style={statusStyle} />
      <Layout onLayout={onLayoutRootView}>{children}</Layout>
      <ModalUpdateAvaliable hasUpdate={state} close={close} />
    </ThemeProvider>
  );
};

export default GlobalConfigs;
