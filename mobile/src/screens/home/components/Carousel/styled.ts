import styled from "styled-components/native";
import { phs, pvs } from "src/utils/metrics";
import { Container } from "src/components/Layout";

export const CarouselContainer = styled.View`
  margin-top: ${pvs(19)};
`;

export const CarouselHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${phs(22)};
`;

export const ViewButton = styled.Pressable``;

export const CarouselWrapper = styled(Container)`
  padding: ${pvs(10)} ${phs(22)};
`;
