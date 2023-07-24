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
  theme: ThemeType;
  themeLoaded: boolean;
}

const ThemeContext = createContext({} as ThemeContexProps);

export const useThemeMode = () => useContext(ThemeContext);

type Props = {
  children: ReactNode;
};

export type ThemeType = {
  type: ColorSchemeName;
  origin: "system" | "localStorage";
};

export const ThemeProvider = ({ children }: Props) => {
  const defaultTheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>({
    type: defaultTheme,
    origin: "system",
  });
  const [themeLoaded, setThemeLoaded] = useState(false);

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    try {
      const themeValue = (await AsyncStorage.getItem(
        "@theme"
      )) as ColorSchemeName | null;
      if (themeValue)
        setTheme({
          type: themeValue,
          origin: "localStorage",
        });
    } catch (error) {
      console.log(error);
    } finally {
      setThemeLoaded(true);
    }
  };

  const changeTheme = async (theme: ColorSchemeName | null) => {
    try {
      if (!theme) {
        setTheme({
          type: defaultTheme,
          origin: "system",
        });
        AsyncStorage.removeItem("@theme");
        return;
      }
      setTheme({
        type: theme,
        origin: "localStorage",
      });
      AsyncStorage.setItem("@theme", theme);
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
