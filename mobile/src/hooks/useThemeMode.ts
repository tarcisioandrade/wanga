import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useThemeMode = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    getTheme();
  }, []);

  const getTheme = async () => {
    try {
      const themeValue = await AsyncStorage.getItem("@theme");
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
