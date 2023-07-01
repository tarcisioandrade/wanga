import React from "react";
import { truncateString } from "src/utils/truncateString";
import {
  CarouselMangaCardContainer,
  CarouselMangaCardBadge,
  CarouselMangaCardBadgeText,
  CarouselMangaCardImage,
  CarouselMangaCardFooter,
  CarouselMangaCardFooterText,
} from "../ReleaseMangaCard/styled";
import { MostReadElement } from "src/@types/mostRead";

type Props = {
  data: MostReadElement;
  position: {
    name: string;
    ranking: number;
  }[];
};

const MostReadCard = ({ data, position }: Props) => {
  const positionTarget = position?.find(({ name }) => name === data.serie_name);

  return (
    <CarouselMangaCardContainer>
      <CarouselMangaCardBadge>
        <CarouselMangaCardBadgeText>{`#${positionTarget?.ranking}`}</CarouselMangaCardBadgeText>
      </CarouselMangaCardBadge>
      <CarouselMangaCardImage
        source={{
          uri: data.cover,
        }}
        resizeMode="cover"
        alt={data.serie_name}
      />

      <CarouselMangaCardFooter>
        <CarouselMangaCardFooterText>
          {truncateString(data.serie_name, 17)}
        </CarouselMangaCardFooterText>
      </CarouselMangaCardFooter>
    </CarouselMangaCardContainer>
  );
};

export default MostReadCard;
