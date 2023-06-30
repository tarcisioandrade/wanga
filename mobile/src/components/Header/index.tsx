import { View, Text, Pressable } from "react-native";
import React from "react";
import { HeaderContainer, LogoContainer, LogoText } from "./styles";
import Hamburguer from "../../../assets/svg-icon/hamburger.svg";
import SearchIcon from "../../../assets/svg-icon/search.svg";
import Logo from "../../../assets/logo.svg";
import { Container, Layout } from "../Layout";
import { vs, hs } from "../../utils/metrics";
import Icon from "../Icon";

type Props = {
  openMenu: () => void;
};

const Header = ({ openMenu }: Props) => {
  return (
    <Container bg="BG_COLOR">
      <HeaderContainer>
        <Pressable onPress={openMenu}>
          <Icon type="fill" icon={Hamburguer} />
        </Pressable>
        <LogoContainer>
          <Logo width={hs(24)} height={vs(24)} />
          <LogoText>Wanga</LogoText>
        </LogoContainer>

        <Pressable>
          <Icon type="stroke" icon={SearchIcon} />
        </Pressable>
      </HeaderContainer>
    </Container>
  );
};

export default Header;
