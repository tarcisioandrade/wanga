import styled from "styled-components/native";
import { phs, pvs } from "src/utils/metrics";

type Props = {
  width?: number;
  height?: number;
};

export const MangaCardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})<Props>`
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  width: ${(props) => (props.width ? phs(props.width) : phs(117))};
  height: ${(props) => (props.height ? pvs(props.height) : pvs(166))};
  background-color: #00000016;
`;

export const MangaCardImage = styled.Image`
  height: ${pvs(166)};
`;

export const MangaCardFooter = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 21px;
  background-color: ${(props) => props.theme.BLACK_TRANSPARENT};
  padding-left: 8px;
  justify-content: center;
  align-items: center;
`;

export const MangaCardBadge = styled.View`
  background-color: ${(props) => props.theme.PRIMARY};
  padding: 3px 10px;
  border-radius: 8px;
  align-self: flex-start;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 999;
`;
