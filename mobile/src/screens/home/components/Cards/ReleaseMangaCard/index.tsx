import React from "react";
import { ReleaseElement } from "src/@types/release";
import {
  CarouselMangaCardContainer,
  CarouselMangaCardBadge,
  CarouselMangaCardFooter,
  CarouselMangaCardImage,
} from "./styled";
import { truncateString } from "src/utils/truncateString";
import { Text } from "src/components/Text";

type Props = {
  data: ReleaseElement;
};

const ReleaseMangaCard = ({ data }: Props) => {
  const goToMangaPage = () => {};
  const firstChapt = data.chapters.at(-1)!;
  const chapterFormat =
    Number(firstChapt?.number) < 9
      ? "0" + firstChapt?.number
      : firstChapt?.number;

  return (
    <CarouselMangaCardContainer onPress={goToMangaPage}>
      <CarouselMangaCardBadge>
        <Text color="WHITE" size="FONT_XS" weight="WEIGHT_MEDIUM">
          {chapterFormat}, ...
        </Text>
      </CarouselMangaCardBadge>

      <CarouselMangaCardImage
        source={{
          uri: data.image,
        }}
        resizeMode="cover"
        alt={data.name}
      />

      <CarouselMangaCardFooter>
        <Text color="WHITE" size="FONT_4XS" weight="WEIGHT_SEMIBOLD">
          {truncateString(data.name, 17)}
        </Text>
      </CarouselMangaCardFooter>
    </CarouselMangaCardContainer>
  );
};

export default ReleaseMangaCard;
