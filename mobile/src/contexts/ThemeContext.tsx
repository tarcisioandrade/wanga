import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ColorSchemeName, useColorScheme } from "react-native";

interface ThemeContexProps {
  getTheme: () => void;
  changeTheme: (theme: ColorSchemeName) => void;
  theme: ColorSchemeName;
  themeLoaded: boolean;
}

const ThemeContext = createContext({} as ThemeContexProps);

export const useThemeMode = () => useContext(ThemeContext);

type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const defaultTheme = useColorScheme();
  const [theme, setTheme] = useState<ColorSchemeName>(defaultTheme);
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    try {
      const themeValue = (await AsyncStorage.getItem(
        "@theme"
      )) as ColorSchemeName;
      if (themeValue) setTheme(themeValue);
    } catch (error) {
      console.log(error);
    } finally {
      setThemeLoaded(true);
    }
  };

  const changeTheme = async (theme: ColorSchemeName) => {
    try {
      if (!theme) {
        await AsyncStorage.removeItem("@theme");
        setTheme(defaultTheme);
        return;
      }

      await AsyncStorage.setItem("@theme", theme);
      setTheme(theme);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ changeTheme, theme, getTheme, themeLoaded }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
