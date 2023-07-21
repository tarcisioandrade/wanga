import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components/native";
import { useThemeMode } from "src/contexts/ThemeContext";
import { darkTheme, lightTheme } from "src/theme";
import { StatusBar } from "expo-status-bar";
//TODO: Trocar o expo google font dev para o do HankenGrotesk
import {
  useFonts,
  HankenGrotesk_400Regular,
  HankenGrotesk_600SemiBold,
  BungeeSpice_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_700Bold,
  HankenGrotesk_800ExtraBold,
} from "@expo-google-fonts/dev";
import LoadingScreen from "src/screens/LoadingScreen";

type Props = {
  children: ReactNode;
};

const GlobalConfigs = ({ children }: Props) => {
  let [fontsLoaded] = useFonts({
    HankenGrotesk_400Regular,
    HankenGrotesk_500Medium,
    HankenGrotesk_600SemiBold,
    HankenGrotesk_700Bold,
    HankenGrotesk_800ExtraBold,
    BungeeSpice_400Regular,
  });
  const { theme, themeLoaded } = useThemeMode();

  const statusStyle = theme === "dark" ? "light" : "dark";
  const themeStyle = theme === "dark" ? darkTheme : lightTheme;

  if (!themeLoaded || !fontsLoaded) return <LoadingScreen />;
  return (
    <ThemeProvider theme={themeStyle}>
      <StatusBar style={statusStyle} />
      {children}
    </ThemeProvider>
  );
};

export default GlobalConfigs;
