import styled, { Theme } from "styled-components/native";
import { phs, pvs } from "src/utils/metrics";

type ContainerBgColor = {
  bg?: keyof Theme;
};

type StackProps = {
  justify_content?: string;
  align_items?: string;
  direction?: string;
  gap?: number;
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

export const Stack = styled.View<StackProps>`
  flex-direction: ${(props) => (props.direction ? props.direction : "column")};
  align-items: ${(props) =>
    props.align_items ? props.align_items : "flex-start"};
  justify-content: ${(props) =>
    props.justify_content ? props.justify_content : "flex-start"};
  gap: ${(props) => (props.gap ? props.gap + "px" : 0)};
`;
