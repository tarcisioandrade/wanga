import React from "react";
import { MostReadPeriodElement } from "src/@types/mostReadPeriod";
import {
  CarouselMangaCardBadge,
  CarouselMangaCardBadgeText,
  CarouselMangaCardContainer,
  CarouselMangaCardFooter,
  CarouselMangaCardFooterText,
  CarouselMangaCardImage,
} from "../ReleaseMangaCard/styled";
import { truncateString } from "src/utils/truncateString";

type Props = {
  data: MostReadPeriodElement;
};

const MostPeriodCard = ({ data }: Props) => {
  return (
    <CarouselMangaCardContainer>
      <CarouselMangaCardBadge>
        <CarouselMangaCardBadgeText>
          {data.chapter_number}
        </CarouselMangaCardBadgeText>
      </CarouselMangaCardBadge>
      <CarouselMangaCardImage
        source={{
          uri: data.series_image,
        }}
        resizeMode="cover"
        alt={data.series_name}
      />

      <CarouselMangaCardFooter>
        <CarouselMangaCardFooterText>
          {truncateString(data.series_name, 17)}
        </CarouselMangaCardFooterText>
      </CarouselMangaCardFooter>
    </CarouselMangaCardContainer>
  );
};

export default MostPeriodCard;
