import React from "react";
import {
  CarouselContainer,
  CarouselHeader,
  CarouselWrapper,
  ViewButton,
  ViewButtonText,
} from "../ReleaseCarousel/styled";
import { Title } from "../../../../../components/Title";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { hs, vs } from "../../../../../utils/metrics";
import { MostReadPeriodElement } from "../../../../../@types/mostReadPeriod";
import MostReadPeriodCard from "../../Cards/MostReadPeriodCard";
import Skeleton from "../../Skeleton";

type Props = {
  most_read_period: MostReadPeriodElement[] | undefined;
  loading: boolean;
};

const MostReadPeriodCarousel = ({ most_read_period, loading }: Props) => {
  const goToScreenMostReadPeriod = () => {};

  return (
    <CarouselContainer>
      <CarouselHeader>
        <Title>Mais Lidos da Semana</Title>
        <ViewButton onPress={goToScreenMostReadPeriod}>
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
              data={most_read_period!}
              renderItem={({ item }) => <MostReadPeriodCard data={item} />}
            />
          </GestureHandlerRootView>
        )}
      </CarouselWrapper>
    </CarouselContainer>
  );
};

export default MostReadPeriodCarousel;
