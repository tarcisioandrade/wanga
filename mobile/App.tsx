import "react-native-gesture-handler";
import { lightTheme, darkTheme } from "./src/theme/theme";
import Button from "./src/components/Button";
import { Container, Layout, ScrollContainer } from "./src/components/Layout";
import { ThemeProvider } from "styled-components/native";
import { useThemeMode } from "./src/hooks/useThemeMode";
import { useFonts } from "expo-font";
import { Text } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    "SF-Pro-Display-Regular": require("./assets/fonts/SFPRODISPLAYREGULAR.otf"),
    "SF-Pro-Display-Medium": require("./assets/fonts/SFPRODISPLAYMEDIUM.otf"),
    "SF-Pro-Display-SemiBold": require("./assets/fonts/SF-Pro-Display-Semibold.ttf"),
    "SF-Pro-Display-Bold": require("./assets/fonts/SFPRODISPLAYBOLD.otf"),
  });
  const { theme, toggleTheme } = useThemeMode();

  if (!fontsLoaded) return <Text>Loading</Text>;
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Layout>
        <ScrollContainer>
          <Container>
            <Button onPress={toggleTheme}>OI</Button>
          </Container>
        </ScrollContainer>
      </Layout>
    </ThemeProvider>
  );
}
