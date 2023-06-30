import React from "react";
import {
  CarouselWrapper,
  CarouselContainer,
  CarouselHeader,
  ViewButton,
  ViewButtonText,
} from "./styled";
import { Title } from "../../../../../components/Title";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { ReleaseElement } from "../../../../../@types/release";
import ReleaseMangaCard from "../../Cards/ReleaseMangaCard";
import { hs, vs } from "../../../../../utils/metrics";
import Skeleton from "../../Skeleton";

type Props = {
  releases: ReleaseElement[] | undefined;
  loading: boolean;
};

const ReleaseCarousel = ({ releases, loading }: Props) => {
  const goToScreenRelease = () => {};
  return (
    <CarouselContainer>
      <CarouselHeader>
        <Title>Lançados Recentemente</Title>
        <ViewButton onPress={goToScreenRelease}>
          <ViewButtonText>Ver Todos</ViewButtonText>
        </ViewButton>
      </CarouselHeader>
      <CarouselWrapper bg="SECONDARY">
        {loading ? (
          <Skeleton />
        ) : (
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
              data={releases!}
              renderItem={({ item }) => (
                <ReleaseMangaCard releaseElement={item} />
              )}
            />
          </GestureHandlerRootView>
        )}
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default ReleaseCarousel;
