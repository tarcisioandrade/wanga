import React from "react";
import fakeData from "../../../../../../fakeData/saiu_hoje.json";
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

const data = fakeData.releases[0] as ReleaseElement;

type Props = {
  releaseElement: ReleaseElement;
};

const ReleaseMangaCard = ({ releaseElement }: Props) => {
  const goToMangaPage = () => {};
  const firstChapt = releaseElement.chapters.at(-1)!;
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
          uri: releaseElement.image,
        }}
        resizeMode="cover"
        alt={releaseElement.name}
      />

      <CarouselMangaCardFooter>
        <CarouselMangaCardFooterText>
          {truncateString(releaseElement.name, 17)}
        </CarouselMangaCardFooterText>
      </CarouselMangaCardFooter>
    </CarouselMangaCardContainer>
  );
};

export default ReleaseMangaCard;
