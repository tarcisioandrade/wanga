import React from "react";
import { ReleaseElement } from "../../../../../@types/release";
import {
  CarouselMangaCardContainer,
  CarouselMangaCardBadge,
  CarouselMangaCardBadgeText,
  CarouselMangaCardFooter,
  CarouselMangaCardFooterText,
  CarouselMangaCardImage,
} from "./styled";
import { truncateString } from "../../../../../utils/truncateString";

type Props = {
  data: ReleaseElement;
};

const ReleaseMangaCard = ({ data }: Props) => {
  const goToMangaPage = () => {};
  const firstChapt = data.chapters.at(-1)!;
  const chapterFormat =
    Number(firstChapt.number) < 9
      ? "0" + firstChapt?.number
      : firstChapt?.number;

  return (
    <CarouselMangaCardContainer onPress={goToMangaPage}>
      <CarouselMangaCardBadge>
        <CarouselMangaCardBadgeText>
          {chapterFormat}, ...
        </CarouselMangaCardBadgeText>
      </CarouselMangaCardBadge>

      <CarouselMangaCardImage
        source={{
          uri: data.image,
        }}
        resizeMode="cover"
        alt={data.name}
      />

      <CarouselMangaCardFooter>
        <CarouselMangaCardFooterText>
          {truncateString(data.name, 17)}
        </CarouselMangaCardFooterText>
      </CarouselMangaCardFooter>
    </CarouselMangaCardContainer>
  );
};

export default ReleaseMangaCard;
