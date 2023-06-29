import "react-native-gesture-handler";
import { lightTheme, darkTheme } from "./src/theme/theme";
import { ThemeProvider } from "styled-components/native";
import { useThemeMode } from "./src/hooks/useThemeMode";
import { useFonts } from "expo-font";
import { Text } from "react-native";
import Routes from "./src/routes/Navigator";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("./assets/fonts/SFPRODISPLAYREGULAR.otf"),
    "SF-Pro-Display-Medium": require("./assets/fonts/SFPRODISPLAYMEDIUM.otf"),
    "SF-Pro-Display-SemiBold": require("./assets/fonts/SF-Pro-Display-Semibold.ttf"),
    "SF-Pro-Display-Bold": require("./assets/fonts/SFPRODISPLAYBOLD.otf"),
  });
  const { theme } = useThemeMode();
  const statusStyle = theme === "dark" ? "light" : "dark";

  if (!fontsLoaded) return <Text>Loading</Text>;
  return (
    <ThemeProvider theme={lightTheme}>
      <StatusBar style={"dark"} />
      <Routes />
    </ThemeProvider>
  );
}
