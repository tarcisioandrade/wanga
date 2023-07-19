import React, { useState } from "react";
import Header from "src/components/Header";
import * as S from "./styled";
import { Container, Layout, Stack } from "src/components/Layout";
import { Text } from "src/components/Text";
import { ColorSchemeName, View } from "react-native";
import { useThemeMode } from "src/contexts/ThemeContext";
import { useTheme } from "styled-components";
import DarkModeIcon from "assets/svg-icon/dark-mode.svg";
import LightModeIcon from "assets/svg-icon/light-mode.svg";
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
];

const Settings = () => {
  const { theme, changeTheme } = useThemeMode();
  const [themeMode, setThemeMode] = useState<ColorSchemeName>(theme);
  const themeProps = useTheme();

  const handleTheme = (id: string) => {
    const theme = id as ColorSchemeName;
    setThemeMode(theme);
    changeTheme(theme);
  };

  return (
    <Layout>
      <Header backShow title="Configurações" />
      <Container>
        <S.SettingItem>
          <S.SettingTitle>Tema</S.SettingTitle>
          <Stack gap={12} mt={4}>
            {radioButtons.map(({ id, value }) => (
              <Stack
                direction="row"
                align_items="center"
                justify_content="space-between"
                key={id}
              >
                <Stack direction="row" align_items="center" gap={6}>
                  <Icon
                    icon={id === "dark" ? DarkModeIcon : LightModeIcon}
                    type="fill"
                  />
                  <Text size="FONT_SM">{value}</Text>
                </Stack>
                <RadioButton
                  selected={themeMode === id}
                  value={value}
                  id={id}
                  onPress={handleTheme}
                  color={themeProps.TEXT_COLOR}
                  size={20}
                />
              </Stack>
            ))}
          </Stack>
        </S.SettingItem>
      </Container>
    </Layout>
  );
};

export default Settings;
