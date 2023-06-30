import React from "react";
import {
  ReleaseCarouselWrapper,
  ReleaseCarouselContainer,
  ReleaseCarouselHeader,
  ViewButton,
  ViewButtonText,
} from "./styled";
import { Title } from "../../../../components/Title";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { ReleaseElement } from "../../../../@types/release";
import MangaCard from "../MangaCard";
import { hs, vs } from "../../../../utils/metrics";

type Props = {
  releases: ReleaseElement[];
};

const ReleaseCarousel = ({ releases }: Props) => {
  const goToScreenRelease = () => {};
  return (
    <ReleaseCarouselContainer>
      <ReleaseCarouselHeader>
        <Title>Lançados Recentemente</Title>
        <ViewButton onPress={goToScreenRelease}>
          <ViewButtonText>Ver Todos</ViewButtonText>
        </ViewButton>
      </ReleaseCarouselHeader>
      <ReleaseCarouselWrapper bg="SECONDARY">
        <GestureHandlerRootView>
          <Carousel
            width={hs(125)}
            style={{ width: "100%" }}
            height={vs(166)}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
            autoFillData={false}
            loop={false}
            data={releases}
            renderItem={({ item }) => <MangaCard releaseElement={item} />}
          />
        </GestureHandlerRootView>
      </ReleaseCarouselWrapper>
    </ReleaseCarouselContainer>
  );
};

export default ReleaseCarousel;
