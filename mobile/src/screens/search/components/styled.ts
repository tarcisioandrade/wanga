import styled from "styled-components/native";
import { phs, pvs } from "src/utils/metrics";
import { BadgeContainer } from "src/components/Badge/styled";

export const SearchWrapper = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  background-color: ${(props) => props.theme.SECONDARY};
  padding: ${pvs(19)} ${phs(13)};
  flex-direction: row;
  gap: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.PRIMARY};
`;

export const SearchInfoContainer = styled.View`
  gap: 5px;
  max-width: 250px;
`;

export const SearchImage = styled.Image`
  width: ${phs(80)};
  height: ${pvs(118)};
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
`;

export const SearchTitle = styled.Text`
  font-size: ${(props) => props.theme.FONT_BASE};
  font-family: ${(props) => props.theme.WEIGHT_SEMIBOLD};
  max-width: ${phs(180)};
  color: ${(props) => props.theme.TEXT_COLOR};
`;

export const Score = styled.View`
  flex-direction: row;
  margin-left: auto;
  gap: 2px;
  position: relative;
  top: 4px;
`;

export const ScoreText = styled.Text`
  font-size: ${(props) => props.theme.FONT_4XS};
  color: ${(props) => props.theme.TEXT_COLOR};
`;

export const Artist = styled.Text`
  color: ${(props) => props.theme.GRAY_600};
  font-family: ${(props) => props.theme.WEIGHT_MEDIUM};
  font-size: ${(props) => props.theme.FONT_XS};
`;

export const BadgesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
`;

export const BadgeStatus = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 800;
  background-color: ${(props) => props.theme.BLACK_TRANSPARENT};
  justify-content: center;
  align-items: center;
  padding: 2px 0;
  border-bottom-right-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const SearchImageContainer = styled.View`
  position: relative;
`;
