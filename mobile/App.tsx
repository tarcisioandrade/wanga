import "react-native-gesture-handler";
import { lightTheme, darkTheme } from "./src/theme/theme";
import { ThemeProvider } from "styled-components/native";
import { useThemeMode } from "./src/hooks/useThemeMode";
import { Text } from "react-native";
import Routes from "./src/routes/Navigator";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useAppStateChange } from "./src/hooks/useAppStateChange";
import Toast from "react-native-toast-message";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import { toastConfig } from "src/components/CustomToast";
import { useConfirmExit } from "src/hooks/useConfirmExit";

export default function App() {
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

  const { theme } = useThemeMode();

  const statusStyle = theme === "dark" ? "light" : "dark";
  const themeStyle = theme === "dark" ? darkTheme : lightTheme;

  const queryClient = new QueryClient();

  useAppStateChange();
  useConfirmExit();

  if (!fontsLoaded) return <Text>Loading</Text>;
  return (
    <ThemeProvider theme={themeStyle}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style={statusStyle} />
        <Routes />
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
