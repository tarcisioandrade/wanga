import { Pressable } from "react-native";
import React from "react";
import HomeIcon from "assets/svg-icon/home.svg";
import FavoritesIcon from "assets/svg-icon/favorites.svg";
import HistoricIcon from "assets/svg-icon/historic.svg";
import DownloadIcon from "assets/svg-icon/paper-download.svg";
import MoreIcon from "assets/svg-icon/more-icon.svg";
import Logo from "assets/logo.svg";
import { SvgProps } from "react-native-svg";
import Animated from "react-native-reanimated";
import { Container } from "../Layout";
import { hs, phs, pvs, vs } from "src/utils/metrics";
import Icon from "../Icon";
import { useTheme } from "styled-components/native";
import { Text } from "../Text";
import CustomPressable from "../CustomPressable";
import { useThemeMode } from "src/contexts/ThemeContext";
import { useDisclose } from "src/hooks/useDisclose";
import * as S from "./styled";
import ModalOptions from "../ModalOptions";
import {
  DrawerContentComponentProps,
  useDrawerProgress,
} from "@react-navigation/drawer";

type IconAndLabelMappings = {
  [key: string]: { icon: React.FC<SvgProps> };
};

const iconAndLabelMappings: IconAndLabelMappings = {
  drawerHome: {
    icon: HomeIcon,
  },
  drawerFavorites: {
    icon: FavoritesIcon,
  },
  drawerHistoric: {
    icon: HistoricIcon,
  },
  drawerDownloads: {
    icon: DownloadIcon,
  },
};

const MenuDrawer = (props: DrawerContentComponentProps) => {
  const { theme: themeMode } = useThemeMode();
  const theme = useTheme();
  const progress = useDrawerProgress();
  const { state, open, close } = useDisclose(false);
  const user = false;

  // @ts-expect-error
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <S.DrawerContainer style={{ transform: [{ translateX }] }}>
      <Container bg="SECONDARY">
        <S.DrawerHeaderContainer>
          <S.DrawerHeaderFlex>
            {user ? (
              <S.DrawerAvatar>
                <Text size="FONT_LG" color="WHITE" weight="WEIGHT_SEMIBOLD">
                  W
                </Text>
              </S.DrawerAvatar>
            ) : (
              <Logo width={hs(40)} height={vs(40)} />
            )}

            <CustomPressable onPress={open}>
              <Icon
                type="fill"
                icon={MoreIcon}
                width={hs(24)}
                height={vs(24)}
              />
            </CustomPressable>
          </S.DrawerHeaderFlex>
          {user ? (
            <S.UserLabel>Woltz-senpai</S.UserLabel>
          ) : (
            <S.NoAuthContainer>
              <Text color="GRAY_600" size="FONT_XS" weight="WEIGHT_MEDIUM">
                Você não está logado.
              </Text>
              <Pressable>
                <S.LinkToLogin>Login</S.LinkToLogin>
              </Pressable>
            </S.NoAuthContainer>
          )}
        </S.DrawerHeaderContainer>
      </Container>
      <Container>
        <S.DrawerItemContainer>
          {props.state.routes.map(({ name, key }, index) => {
            const { options } = props.descriptors[key];
            const isFocused = props.state.index === index;
            const IconDrawer = iconAndLabelMappings[name].icon;
            return (
              <S.CustomDrawerItem
                key={key}
                active={isFocused}
                onPress={() => props.navigation.navigate(name)}
              >
                <Icon
                  type="fill"
                  icon={IconDrawer}
                  color={theme.MENU_ITEM_COLOR}
                  width={phs(24)}
                  height={pvs(24)}
                />
                <Text
                  color={themeMode.type === "dark" ? "GRAY_500" : "PRIMARY"}
                  size="FONT_XS"
                  weight="WEIGHT_MEDIUM"
                >
                  {options.title}
                </Text>
              </S.CustomDrawerItem>
            );
          })}
        </S.DrawerItemContainer>
      </Container>

      {/* Modal More  */}
      <ModalOptions isOpen={state} onClose={close} />
    </S.DrawerContainer>
  );
};

export default MenuDrawer;
