import { Pressable, ToastAndroid } from "react-native";
import React from "react";
import HomeIcon from "assets/svg-icon/home.svg";
import FavoritesIcon from "assets/svg-icon/favorites.svg";
import HistoricIcon from "assets/svg-icon/historic.svg";
import DownloadIcon from "assets/svg-icon/paper-download.svg";
import LogoutIcon from "assets/svg-icon/logout.svg";
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
import { useUser } from "src/contexts/UserContext";
import Modal from "../Modal";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

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
  const {
    state: modalConfirmLogout,
    open: openModalConfirmLogout,
    close: closeModalConfirmLogout,
  } = useDisclose(false);

  const { user, removeUserFromLocalStorage } = useUser();

  // @ts-expect-error
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  const goToLoginScreen = () => {
    props.navigation.navigate("login");
  };

  const logout = async () => {
    const isGoogleSignenIn = await GoogleSignin.isSignedIn();
    if (isGoogleSignenIn) await GoogleSignin.signOut();

    removeUserFromLocalStorage();
    closeModalConfirmLogout();
    props.navigation.navigate("home");
    ToastAndroid.show("Desconectado.", ToastAndroid.TOP);
  };

  return (
    <S.DrawerContainer style={{ transform: [{ translateX }] }}>
      <Container bg="SECONDARY">
        <S.DrawerHeaderContainer>
          <S.DrawerHeaderFlex>
            {user ? (
              <S.DrawerAvatar>
                <Text size="FONT_LG" color="WHITE" weight="WEIGHT_SEMIBOLD">
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </S.DrawerAvatar>
            ) : (
              <Pressable onPress={goToLoginScreen}>
                <Logo width={hs(40)} height={vs(40)} />
              </Pressable>
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
            <S.UserLabel>Olá, {user.name}</S.UserLabel>
          ) : (
            <S.NoAuthContainer>
              <Text color="GRAY_600" size="FONT_XS" weight="WEIGHT_MEDIUM">
                Você não está logado.
              </Text>
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
            const favoriteBlocked = !user && options.title === "Favoritos";

            return (
              <S.CustomDrawerItem
                key={key}
                active={isFocused}
                onPress={() => props.navigation.navigate(name)}
                disabled={favoriteBlocked}
              >
                <Icon
                  type="fill"
                  icon={IconDrawer}
                  color={
                    favoriteBlocked
                      ? theme.SKELETON_COLOR
                      : theme.MENU_ITEM_COLOR
                  }
                  width={phs(24)}
                  height={pvs(24)}
                />
                <Text
                  color={
                    favoriteBlocked
                      ? "SKELETON_COLOR"
                      : themeMode.type === "dark"
                      ? "GRAY_500"
                      : "PRIMARY"
                  }
                  size="FONT_XS"
                  weight="WEIGHT_MEDIUM"
                >
                  {options.title}
                </Text>
              </S.CustomDrawerItem>
            );
          })}
        </S.DrawerItemContainer>
        {user && (
          <S.LogoutButton
            style={({ pressed }) => ({
              backgroundColor: pressed ? theme.SECONDARY : "transparent",
            })}
            onPress={openModalConfirmLogout}
          >
            <Icon
              type="fill"
              icon={LogoutIcon}
              color={theme.MENU_ITEM_COLOR}
              width={phs(24)}
              height={pvs(24)}
            />
            <Text
              color={themeMode.type === "dark" ? "GRAY_500" : "PRIMARY"}
              size="FONT_XS"
              weight="WEIGHT_MEDIUM"
            >
              Sair
            </Text>
          </S.LogoutButton>
        )}
      </Container>

      {/* Modal More Options  */}
      <ModalOptions isOpen={state} onClose={close} />

      {/* Modal Confirm Logout  */}
      <Modal.Root isOpen={modalConfirmLogout} onClose={closeModalConfirmLogout}>
        <Modal.Header>YAMEROO!</Modal.Header>
        <Modal.Content>
          <Text>Tem certeza que quer sair?</Text>
        </Modal.Content>
        <Modal.Footer>
          <CustomPressable radius={4} onPress={closeModalConfirmLogout}>
            <Text>NÃO</Text>
          </CustomPressable>
          <CustomPressable radius={4} onPress={logout}>
            <Text>SIM</Text>
          </CustomPressable>
        </Modal.Footer>
      </Modal.Root>
    </S.DrawerContainer>
  );
};

export default MenuDrawer;
