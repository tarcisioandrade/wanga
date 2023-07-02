import { Pressable } from "react-native";
import React from "react";
import {
  DrawerContentComponentProps,
  useDrawerProgress,
} from "@react-navigation/drawer";
import HomeIcon from "assets/svg-icon/home.svg";
import FavoritesIcon from "assets/svg-icon/favorites.svg";
import HistoricIcon from "assets/svg-icon/historic.svg";
import MoreIcon from "assets/svg-icon/more-icon.svg";
import Logo from "assets/logo.svg";
import { SvgProps } from "react-native-svg";
import Animated from "react-native-reanimated";
import {
  DrawerAvatar,
  DrawerContainer,
  DrawerHeaderContainer,
  DrawerHeaderFlex,
  DrawerItemContainer,
  CustomDrawerItem,
  LinkToLogin,
  NoAuthContainer,
  UserLabel,
} from "./styled";
import { Container } from "../Layout";
import { hs, phs, pvs, vs } from "src/utils/metrics";
import Icon from "../Icon";
import { useTheme } from "styled-components/native";
import { Text } from "../Text";

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
};

const CustomDrawer = (props: DrawerContentComponentProps) => {
  const theme = useTheme();
  const progress = useDrawerProgress();
  const user = false;
  // @ts-expect-error
  const translateX = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [-100, 0],
  });

  return (
    <DrawerContainer style={{ transform: [{ translateX }] }}>
      <Container bg="SECONDARY">
        <DrawerHeaderContainer>
          <DrawerHeaderFlex>
            {user ? (
              <DrawerAvatar>
                <Text size="FONT_LG" color="WHITE" weight="WEIGHT_SEMIBOLD">
                  W
                </Text>
              </DrawerAvatar>
            ) : (
              <Logo width={hs(40)} height={vs(40)} />
            )}

            <Pressable>
              <Icon
                type="fill"
                icon={MoreIcon}
                width={hs(24)}
                height={vs(24)}
              />
            </Pressable>
          </DrawerHeaderFlex>
          {user ? (
            <UserLabel>Woltz-senpai</UserLabel>
          ) : (
            <NoAuthContainer>
              <Text color="GRAY_600" size="FONT_XS" weight="WEIGHT_MEDIUM">
                Você não está logado.{" "}
              </Text>
              <Pressable>
                <LinkToLogin>Login</LinkToLogin>
              </Pressable>
            </NoAuthContainer>
          )}
        </DrawerHeaderContainer>
      </Container>
      <Container>
        <DrawerItemContainer>
          {props.state.routes.map(({ name, key }, index) => {
            const { options } = props.descriptors[key];
            const isFocused = props.state.index === index;
            const IconDrawer = iconAndLabelMappings[name].icon;
            return (
              <CustomDrawerItem
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
                <Text color="PRIMARY" size="FONT_XS" weight="WEIGHT_MEDIUM">
                  {options.title}
                </Text>
              </CustomDrawerItem>
            );
          })}
        </DrawerItemContainer>
      </Container>
    </DrawerContainer>
  );
};

export default CustomDrawer;
