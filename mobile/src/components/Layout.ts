import styled, { Theme } from "styled-components/native";
import { phs, pvs } from "src/utils/metrics";

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

export const ScrollContainer = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 70 },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;
