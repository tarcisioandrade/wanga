import styled from "styled-components/native";
import { pvs, pms } from "../../utils/metrics";

export const PrimaryButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  background-color: ${(props) => props.theme.PRIMARY};
  border-radius: 8px;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: ${pvs(50)};
`;

export const ButtonText = styled.Text`
  color: ${(props) => props.theme.WHITE};
  font-size: ${(props) => props.theme.FONT_BASE} ;
  font-family: ${(props) => props.theme.FONT_FAMILY.MEDIUM} ;
`;
