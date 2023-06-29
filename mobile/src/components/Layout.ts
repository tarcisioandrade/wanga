import { styled } from "styled-components/native";
import { phs, pvs } from "../utils/metrics";
import Constants from "expo-constants";

export const Layout = styled.SafeAreaView`
  background-color: ${(props) => props.theme.BG_COLOR};
  flex: 1;
  padding-top: ${Constants.statusBarHeight + "px"};
`;

export const Container = styled.View`
  padding: 0 ${phs(22)};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
  padding-bottom: ${pvs(70)};
`;
