import { View, Text, Pressable } from "react-native";
import React from "react";
import {
  HeaderContainer,
  InputSearch,
  LogoContainer,
  LogoText,
} from "./styled";
import Hamburguer from "../../../assets/svg-icon/hamburger.svg";
import SearchIcon from "../../../assets/svg-icon/search.svg";
import ArrowLeft from "../../../assets/svg-icon/arrow-left.svg";
import Logo from "../../../assets/logo.svg";
import { Container, Layout } from "../Layout";
import { vs, hs } from "../../utils/metrics";
import Icon from "../Icon";
import { useNavigation, DrawerActions } from "@react-navigation/native";

type Props = {
  inputShow?: boolean;
  value?: string;
  onChangeValue?: (value: string) => void;
};
const Header = ({ inputShow, onChangeValue, value }: Props) => {
  const navigator = useNavigation();

  return (
    <Container bg="BG_COLOR">
      <HeaderContainer>
        {inputShow ? (
          <>
            <Pressable onPress={navigator.goBack}>
              <Icon type="fill" icon={ArrowLeft} />
            </Pressable>
            <InputSearch
              onChangeText={onChangeValue}
              value={value}
              autoFocus={inputShow}
            />
          </>
        ) : (
          <>
            <Pressable
              onPress={() => navigator.dispatch(DrawerActions.openDrawer)}
            >
              <Icon type="fill" icon={Hamburguer} />
            </Pressable>

            <LogoContainer>
              <Logo width={hs(24)} height={vs(24)} />
              <LogoText>Wanga</LogoText>
            </LogoContainer>

            <Pressable onPress={() => navigator.navigate("search")}>
              <Icon type="stroke" icon={SearchIcon} />
            </Pressable>
          </>
        )}
      </HeaderContainer>
    </Container>
  );
};

export default Header;
