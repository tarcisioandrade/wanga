import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { phs, pvs } from "../../utils/metrics";

type DrawerActive = {
  active: boolean;
};

export const DrawerContainer = styled(Animated.View)`
  font-family: ${(props) => props.theme.FONT_FAMILY};
  padding-top: ${Constants.statusBarHeight + "px"};
  flex: 1;
  background-color: ${(props) => props.theme.BG_COLOR};
`;

export const DrawerHeaderContainer = styled.View`
  padding-top: ${Constants.statusBarHeight + "px"};
  height: ${pvs(114)};
`;

export const DrawerHeaderFlex = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const DrawerAvatar = styled.View`
  width: ${phs(40)};
  height: ${pvs(40)};
  border-radius: 100px;
  background-color: ${(props) => props.theme.PRIMARY};
  justify-content: center;
  align-items: center;
`;

export const DrawerAvatarText = styled.Text`
  font-weight: 600;
  font-size: ${(props) => props.theme.FONT_LG};
  color: ${(props) => props.theme.WHITE};
`;

export const NoAuthContainer = styled.View`
  flex-direction: row;
  margin-top: ${pvs(10)};
`;

export const NoAuthMessage = styled.Text`
  font-weight: 500;
  font-size: ${(props) => props.theme.FONT_XS};
  color: ${(props) => props.theme.GRAY_600};
`;

export const LinkToLogin = styled.Text`
  color: ${(props) => props.theme.PRIMARY};
  font-size: ${(props) => props.theme.FONT_XS};
  text-decoration: underline;
`;

export const UserLabel = styled.Text`
  font-size: ${(props) => props.theme.FONT_BASE};
  color: ${(props) => props.theme.GRAY_600};
  font-weight: 600;
  margin-top: ${pvs(10)};
`;

export const DrawerItemContainer = styled.View`
  margin-top: ${pvs(26)};
  gap: 10px;
`;

export const CustomDrawerItem = styled.Pressable<DrawerActive>`
  padding: ${pvs(10)} ${phs(10)};
  background-color: ${(props) =>
    props.active ? props.theme.SECONDARY : "transparent"};
  border-radius: 4px;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

export const DrawerItemText = styled.Text`
  color: ${(props) => props.theme.MENU_ITEM_COLOR};
  font-size: 14px;
  font-weight: 500;
`;
