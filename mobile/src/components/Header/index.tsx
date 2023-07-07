import React from "react";
import {
  HeaderContainer,
  InputSearch,
  LogoContainer,
  LogoText,
} from "./styled";
import Hamburguer from "assets/svg-icon/hamburger.svg";
import SearchIcon from "assets/svg-icon/search.svg";
import ArrowLeft from "assets/svg-icon/arrow-left.svg";
import Logo from "assets/logo.svg";
import { Container, Layout, Stack } from "../Layout";
import { vs, hs } from "src/utils/metrics";
import Icon from "../Icon";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import CustomPressable from "../CustomPressable";
import { Text } from "../Text";

type Props = {
  inputShow?: boolean;
  backShow?: boolean;
  menuShow?: boolean;
  searchShow?: boolean;
  logoShow?: boolean;
  title?: string;
  value?: string;
  onChangeValue?: (value: string) => void;
};
const Header = ({
  inputShow,
  backShow,
  menuShow,
  searchShow,
  logoShow,
  title,
  onChangeValue,
  value,
}: Props) => {
  const navigator = useNavigation();

  return (
    <Container bg="BG_COLOR">
      <HeaderContainer>
        {backShow && (
          <Stack direction="row" gap={16} align_items="center">
            <CustomPressable onPress={navigator.goBack}>
              <Icon type="fill" icon={ArrowLeft} />
            </CustomPressable>

            {title && (
              <Text size="FONT_LG" weight="WEIGHT_SEMIBOLD">
                {title}
              </Text>
            )}
          </Stack>
        )}
        {menuShow && (
          <CustomPressable
            onPress={() => navigator.dispatch(DrawerActions.openDrawer)}
          >
            <Icon type="fill" icon={Hamburguer} />
          </CustomPressable>
        )}

        {inputShow && (
          <InputSearch
            onChangeText={onChangeValue}
            value={value}
            autoFocus={inputShow}
          />
        )}

        {logoShow && (
          <LogoContainer>
            <Logo width={hs(24)} height={vs(24)} />
            <LogoText>Wanga</LogoText>
          </LogoContainer>
        )}

        {searchShow && (
          <CustomPressable onPress={() => navigator.navigate("search")}>
            <Icon type="stroke" icon={SearchIcon} />
          </CustomPressable>
        )}
      </HeaderContainer>
    </Container>
  );
};

export default Header;
