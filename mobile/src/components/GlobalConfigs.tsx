import React, { ReactNode } from "react";
import { ThemeProvider } from "styled-components/native";
import { useThemeMode } from "src/contexts/ThemeContext";
import { darkTheme, lightTheme } from "src/theme/theme";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import LoadingScreen from "src/screens/LoadingScreen";

type Props = {
  children: ReactNode;
};

const GlobalConfigs = ({ children }: Props) => {
  // const [fontsLoaded] = useFonts({
  //   "SF-Pro-Display-Regular": require("./assets/fonts/SFPRODISPLAYREGULAR.otf"),
  //   "SF-Pro-Display-Medium": require("./assets/fonts/SFPRODISPLAYMEDIUM.otf"),
  //   "SF-Pro-Display-SemiBold": require("./assets/fonts/SF-Pro-Display-Semibold.otf"),
  //   "SF-Pro-Display-Bold": require("./assets/fonts/SFPRODISPLAYBOLD.otf"),
  // });
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
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
