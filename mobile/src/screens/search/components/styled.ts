import styled from "styled-components/native";
import { phs, pvs } from "../../../utils/metrics";

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
  font-size: ${(props) => props.theme.FONT_XXS};
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
