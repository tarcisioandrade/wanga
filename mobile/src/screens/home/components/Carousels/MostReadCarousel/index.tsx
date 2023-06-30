import React from "react";
import { MostReadElement } from "../../../../../@types/mostRead";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { Title } from "../../../../../components/Title";
import { hs, vs } from "../../../../../utils/metrics";
import {
  CarouselContainer,
  CarouselHeader,
  ViewButton,
  ViewButtonText,
  CarouselWrapper,
} from "../ReleaseCarousel/styled";
import MostReadCard from "../../Cards/MostReadCard";

type Props = {
  most_read: MostReadElement[];
};

const MostReadCarousel = ({ most_read }: Props) => {
  const goToScreenMostRead = () => {};

  const mostReadRanking = most_read.map(({ serie_name }, i) => ({
    ranking: i + 1,
    name: serie_name,
  }));

  return (
    <CarouselContainer>
      <CarouselHeader>
        <Title>Mais Lidos</Title>
        <ViewButton onPress={goToScreenMostRead}>
          <ViewButtonText>Ver Todos</ViewButtonText>
        </ViewButton>
      </CarouselHeader>
      <CarouselWrapper bg="SECONDARY">
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
            data={most_read}
            renderItem={({ item }) => (
              <MostReadCard data={item} position={mostReadRanking} />
            )}
          />
        </GestureHandlerRootView>
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default MostReadCarousel;
