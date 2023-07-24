import React, { useState } from "react";
import Header from "src/components/Header";
import * as S from "./styled";
import { Container, Layout, Stack } from "src/components/Layout";
import { Text } from "src/components/Text";
import { ColorSchemeName, Appearance } from "react-native";
import { useThemeMode, type ThemeType } from "src/contexts/ThemeContext";
import { useTheme } from "styled-components";
import DarkModeIcon from "assets/svg-icon/dark-mode.svg";
import LightModeIcon from "assets/svg-icon/light-mode.svg";
import SystemModeIcon from "assets/svg-icon/system-theme.svg";
import Icon from "src/components/Icon";
import {
  RadioButtonProps,
  RadioButton,
} from "react-native-radio-buttons-group";

const radioButtons: RadioButtonProps[] = [
  {
    id: "light",
    value: "Modo Claro",
  },
  {
    id: "dark",
    value: "Modo Escuro",
  },
  {
    id: "",
    value: "Padrão Sistema",
  },
];

const Settings = () => {
  const { theme, changeTheme } = useThemeMode();
  const [themeMode, setThemeMode] = useState<ThemeType>(theme);
  const themeProps = useTheme();

  const handleTheme = (id: string) => {
    const theme = id as ColorSchemeName;
    if (id === "") {
      setThemeMode({
        type: Appearance.getColorScheme(),
        origin: "system",
      });
      changeTheme(null);
      return;
    }

    setThemeMode({
      type: theme,
      origin: "localStorage",
    });

    changeTheme(theme);
  };

  return (
    <Layout>
      <Header backShow title="Configurações" />
      <Container>
        <S.SettingItem>
          <S.SettingTitle>Tema</S.SettingTitle>
          <Stack gap={12} mt={4}>
            {radioButtons.map(({ id, value }) => {
              const isDefaultSystem =
                themeMode.origin === "system" && id === "";

              const checked = isDefaultSystem
                ? isDefaultSystem
                : theme.origin === "localStorage" && themeMode.type === id;

              const icon =
                id === ""
                  ? SystemModeIcon
                  : id === "dark"
                  ? DarkModeIcon
                  : LightModeIcon;
              return (
                <Stack
                  direction="row"
                  align_items="center"
                  justify_content="space-between"
                  key={id}
                >
                  <Stack direction="row" align_items="center" gap={6}>
                    <Icon icon={icon} type="fill" size={22} />
                    <Text size="FONT_2XS">{value}</Text>
                  </Stack>
                  <RadioButton
                    selected={checked}
                    value={value}
                    id={id}
                    onPress={handleTheme}
                    color={themeProps.TEXT_COLOR}
                    size={18}
                  />
                </Stack>
              );
            })}
          </Stack>
        </S.SettingItem>
      </Container>
    </Layout>
  );
};

export default Settings;
