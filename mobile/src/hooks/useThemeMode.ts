import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ThemeMode = "light" | "dark";

export const useThemeMode = () => {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    try {
      const themeValue = (await AsyncStorage.getItem("@theme")) as ThemeMode;
      if (themeValue) setTheme(themeValue);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleTheme = async () => {
    const themeValue = theme === "dark" ? "light" : "dark";
    try {
      await AsyncStorage.setItem("@theme", themeValue);
      setTheme(themeValue);
    } catch (error) {
      console.log(error);
    }
  };

  return { theme, toggleTheme };
};
