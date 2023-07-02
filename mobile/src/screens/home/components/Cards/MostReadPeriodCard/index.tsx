import React from "react";
import { MostReadPeriodElement } from "src/@types/mostReadPeriod";
import {
  CarouselMangaCardBadge,
  CarouselMangaCardContainer,
  CarouselMangaCardFooter,
  CarouselMangaCardImage,
} from "../ReleaseMangaCard/styled";
import { truncateString } from "src/utils/truncateString";
import { Text } from "src/components/Text";

type Props = {
  data: MostReadPeriodElement;
};

const MostPeriodCard = ({ data }: Props) => {
  return (
    <CarouselMangaCardContainer>
      <CarouselMangaCardBadge>
        <Text color="WHITE" size="FONT_XS" weight="WEIGHT_MEDIUM">
          {data.chapter_number}
        </Text>
      </CarouselMangaCardBadge>
      <CarouselMangaCardImage
        source={{
          uri: data.series_image,
        }}
        resizeMode="cover"
        alt={data.series_name}
      />

      <CarouselMangaCardFooter>
        <Text color="WHITE" size="FONT_4XS" weight="WEIGHT_SEMIBOLD">
          {truncateString(data.series_name, 17)}
        </Text>
      </CarouselMangaCardFooter>
    </CarouselMangaCardContainer>
  );
};

export default MostPeriodCard;
