import React, { memo } from "react";
import { ReleaseElement } from "src/@types/release";
import { truncateString } from "src/utils/truncateString";
import { Text } from "src/components/Text";
import {
  CarouselMangaCardContainer,
  CarouselMangaCardBadge,
  CarouselMangaCardFooter,
  CarouselMangaCardImage,
} from "./styled";
import { useNavigation } from "@react-navigation/native";

type Props = {
  data: ReleaseElement;
};

const ReleaseMangaCard = ({ data }: Props) => {
  const navigator = useNavigation();

  const firstChapt = data.chapters.at(-1)!;

  const chapterFormat =
    Number(firstChapt?.number) < 9
      ? "0" + firstChapt?.number
      : firstChapt?.number;

  const chapterLabel =
    data.chapters.length > 1 ? `${chapterFormat}, ...` : chapterFormat;

  const goToMangaScreen = (id: number) => {
    navigator.navigate("manga", {
      id,
    });
  };

  return (
    <CarouselMangaCardContainer onPress={() => goToMangaScreen(data.id_serie)}>
      <CarouselMangaCardBadge>
        <Text color="WHITE" size="FONT_XS" weight="WEIGHT_MEDIUM">
          {chapterLabel}
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
          {truncateString(data.name, 16)}
        </Text>
      </CarouselMangaCardFooter>
    </CarouselMangaCardContainer>
  );
};

export default memo(ReleaseMangaCard);
