import React, { ElementType } from "react";
import * as S from "./styled";
import Carousel from "react-native-reanimated-carousel";
import { hs, vs } from "src/utils/metrics";
import CarouselSkeleton from "../CarouselSkeleton";
import RefreshInError from "src/components/RefreshInError";

type CarouselWrapperProps = {
  data: any;
  loading: boolean;
  card: ElementType;
  position?: {
    name: string;
    ranking: number;
  }[];
  error: boolean;
  refresh: () => void;
};

const CarouselWrapper = ({
  card: Card,
  loading,
  data,
  position,
  error,
  refresh,
}: CarouselWrapperProps) => {
  return (
    <S.CarouselWrapper bg="SECONDARY">
      {error ? (
        <RefreshInError refresh={refresh} />
      ) : loading ? (
        <CarouselSkeleton />
      ) : (
        <Carousel
          width={hs(125)}
          style={{ width: "100%" }}
          height={vs(166)}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          autoFillData={false}
          overscrollEnabled={false}
          loop={false}
          data={data}
          renderItem={({ item }) =>
            position ? (
              <Card data={item} position={position} />
            ) : (
              <Card data={item} />
            )
          }
        />
      )}
    </S.CarouselWrapper>
  );
};

export default CarouselWrapper;
