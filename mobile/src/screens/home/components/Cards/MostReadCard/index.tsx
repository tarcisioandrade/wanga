import React, { memo } from "react";
import { truncateString } from "src/utils/truncateString";
import {
  CarouselMangaCardContainer,
  CarouselMangaCardBadge,
  CarouselMangaCardImage,
  CarouselMangaCardFooter,
} from "../ReleaseMangaCard/styled";
import { MostReadElement } from "src/@types/mostRead";
import { Text } from "src/components/Text";
import { useNavigation } from "@react-navigation/native";

type Props = {
  data: MostReadElement;
  position: {
    name: string;
    ranking: number;
  }[];
};

const MostReadCard = ({ data, position }: Props) => {
  const positionTarget = position?.find(({ name }) => name === data.serie_name);

  const navigator = useNavigation();

  const goToMangaScreen = (id: number) => {
    navigator.navigate("manga", {
      id,
    });
  };

  // TODO: TRANSFORMAR ESSES CARDS EM PATTERN COMPOSITION

  return (
    <CarouselMangaCardContainer onPress={() => goToMangaScreen(data.id_serie)}>
      <CarouselMangaCardBadge>
        <Text color="WHITE" size="FONT_XS" weight="WEIGHT_MEDIUM">
          {`#${positionTarget?.ranking}`}
        </Text>
      </CarouselMangaCardBadge>
      <CarouselMangaCardImage
        source={{
          uri: data.cover,
        }}
        resizeMode="cover"
        alt={data.serie_name}
      />

      <CarouselMangaCardFooter>
        <Text color="WHITE" size="FONT_4XS" weight="WEIGHT_SEMIBOLD">
          {truncateString(data.serie_name, 16)}
        </Text>
      </CarouselMangaCardFooter>
    </CarouselMangaCardContainer>
  );
};

export default memo(MostReadCard);
