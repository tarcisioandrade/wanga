import styled, { Theme } from "styled-components/native";
import { phs, pvs } from "src/utils/metrics";
import { css } from "styled-components";

type ContainerProps = {
  bg?: keyof Theme;
  py?: number;
  pb?: number;
};

type StackProps = {
  justify_content?: string;
  align_items?: string;
  direction?: "row" | "column";
  gap?: number;
  wrap?: boolean;
  flex?: number;
  pb?: number;
  mt?: number;
  my?: number;
  px?: number;
  py?: number;
  height?: number;
};

export const Layout = styled.SafeAreaView`
  background-color: ${(props) => props.theme.BG_COLOR};
  flex: 1;
`;

export const Container = styled.View<ContainerProps>`
  padding: 0 ${phs(22)};
  background-color: ${({ bg, theme }) => (bg ? theme[bg] : "transparent")};

  ${(props) =>
    props.py &&
    css`
      padding-top: ${pvs(props.py)};
      padding-bottom: ${pvs(props.py)};
    `}

  ${(props) =>
    props.pb &&
    css`
      padding-bottom: ${pvs(props.pb)};
    `}
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
  padding-bottom: ${(props) => (props.pb ? pvs(props.pb) : 0)};
  ${(props) =>
    props.wrap &&
    css`
      flex-wrap: wrap;
    `}

  ${(props) =>
    props.mt &&
    css`
      margin-top: ${pvs(props.mt)};
    `}

    ${(props) =>
    props.flex &&
    css`
      flex: ${props.flex};
    `}

    
    ${(props) =>
    props.my &&
    css`
      margin-top: ${pvs(props.my)};
      margin-bottom: ${pvs(props.my)};
    `}

    ${(props) =>
    props.px &&
    css`
      padding-left: ${phs(props.px)};
      padding-right: ${phs(props.px)};
    `}

    ${(props) =>
    props.py &&
    css`
      padding-top: ${pvs(props.py)};
      padding-bottom: ${pvs(props.py)};
    `}

    ${(props) =>
    props.height &&
    css`
      height: ${pvs(props.height)};
    `}
`;
