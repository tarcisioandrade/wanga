import styled from "styled-components/native";
import { phs, pvs } from "../../../../utils/metrics";
import { Container } from "../../../../components/Layout";

export const ReleaseCarouselContainer = styled.View`
  margin-top: ${pvs(19)};
`;

export const ReleaseCarouselHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 ${phs(22)};
`;

export const ViewButton = styled.Pressable``;

export const ViewButtonText = styled.Text`
  font-weight: 400;
  font-size: ${(props) => props.theme.FONT_XS};
  color: ${(props) => props.theme.GRAY_600};
`;

export const ReleaseCarouselWrapper = styled(Container)`
  padding: ${pvs(10)} ${phs(22)};
`;
