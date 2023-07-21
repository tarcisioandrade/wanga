import React from "react";
import * as S from "./styled";
import Hamburguer from "assets/svg-icon/hamburger.svg";
import SearchIcon from "assets/svg-icon/search.svg";
import ArrowLeft from "assets/svg-icon/arrow-left.svg";
import Category from "assets/svg-icon/category.svg";
import Logo from "assets/logo.svg";
import { Container, Stack } from "../Layout";
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
  categoryShow?: boolean;
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
  categoryShow,
  title,
  onChangeValue,
  value,
}: Props) => {
  const navigator = useNavigation();

  return (
    <Container bg="BG_COLOR">
      <S.HeaderContainer>
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
          <S.InputSearch
            onChangeText={onChangeValue}
            value={value}
            autoFocus={inputShow}
          />
        )}

        {logoShow && (
          <S.LogoContainer>
            <Logo width={hs(24)} height={vs(24)} />
            <S.LogoText>Wanga</S.LogoText>
          </S.LogoContainer>
        )}

        {searchShow && (
          <Stack direction="row" gap={16} align_items="center">
            <CustomPressable onPress={() => navigator.navigate("search")}>
              <Icon type="stroke" icon={SearchIcon} />
            </CustomPressable>

            {categoryShow && (
              <CustomPressable
                onPress={() =>
                  navigator
                    .getParent()
                    ?.getParent()
                    ?.dispatch(DrawerActions.openDrawer)
                }
              >
                <Icon type="stroke" icon={Category} />
              </CustomPressable>
            )}
          </Stack>
        )}
      </S.HeaderContainer>
    </Container>
  );
};

export default Header;
