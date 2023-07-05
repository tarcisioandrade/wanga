import React, { ElementType, ReactNode } from "react";
import * as S from "./styled";
import Carousel from "react-native-reanimated-carousel";
import { hs, vs } from "src/utils/metrics";
import Skeleton from "../Skeleton";

type CarouselWrapperProps = {
  data: any;
  loading: boolean;
  card: ElementType;
  position?: {
    name: string;
    ranking: number;
  }[];
};

const CarouselWrapper = ({
  card: Card,
  loading,
  data,
  position,
}: CarouselWrapperProps) => {
  return (
    <S.CarouselWrapper bg="SECONDARY">
      {loading ? (
        <Skeleton />
      ) : (
        <Carousel
          width={hs(125)}
          style={{ width: "100%" }}
          height={vs(166)}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          autoFillData={false}
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
