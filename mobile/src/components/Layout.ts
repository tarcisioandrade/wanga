import { Theme, styled } from "styled-components/native";
import { phs, pvs } from "../utils/metrics";

type ContainerBgColor = {
  bg?: keyof Theme;
};

export const Layout = styled.SafeAreaView`
  background-color: ${(props) => props.theme.BG_COLOR};
  flex: 1;
`;

export const Container = styled.View<ContainerBgColor>`
  padding: 0 ${phs(22)};
  background-color: ${({ bg, theme }) => (bg ? theme[bg] : "transparent")};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding-bottom: ${pvs(70)};
`;
