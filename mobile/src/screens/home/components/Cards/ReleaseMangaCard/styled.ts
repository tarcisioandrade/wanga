import styled from "styled-components/native";
import { phs, pvs } from "../../../../../utils/metrics";

export const CarouselMangaCardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  width: ${phs(117)};
  height: ${pvs(166)};
`;

export const CarouselMangaCardImage = styled.Image`
  height: ${pvs(166)};
`;

export const CarouselMangaCardFooter = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 21px;
  background-color: rgba(0, 0, 0, 0.5);
  padding-left: 8px;
  justify-content: center;
  align-items: center;
`;

export const CarouselMangaCardFooterText = styled.Text`
  font-size: ${(props) => props.theme.FONT_XXS};
  color: ${(props) => props.theme.WHITE};
  font-weight: 700;
`;

export const CarouselMangaCardBadge = styled.View`
  background-color: ${(props) => props.theme.PRIMARY};
  padding: 3px 10px;
  border-radius: 8px;
  align-self: flex-start;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 999;
`;

export const CarouselMangaCardBadgeText = styled.Text`
  color: ${(props) => props.theme.WHITE};
  font-weight: 600;
  font-size: ${(props) => props.theme.FONT_XS};
`;
