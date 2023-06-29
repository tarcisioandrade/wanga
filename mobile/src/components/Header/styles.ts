import styled from "styled-components/native";
import Constants from "expo-constants";
import { pvs } from "../../utils/metrics";

export const HeaderContainer = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-top: ${Constants.statusBarHeight + "px"};
  height: ${pvs(50)};
`;

export const LogoContainer = styled.View`
  flex-direction: row;
  gap: 4px;
`;

export const LogoText = styled.Text`
  font-family: ${(props) => props.theme.FONT_FAMILY};
  font-size: ${(props) => props.theme.FONT_LG};
  color: ${(props) => props.theme.TEXT_COLOR};
  font-weight: 700;
`;
