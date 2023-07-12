import React, { memo } from "react";
import {
  MangaCardBadge,
  MangaCardContainer,
  MangaCardFooter,
  MangaCardImage,
} from "./styled";
import { Text } from "../../../../components/Text";
import { truncateString } from "src/utils/truncateString";
import { useNavigation } from "@react-navigation/native";
import { MostReadPeriodElement } from "src/@types/mostReadPeriod";

type Props = {
  data: Pick<
    MostReadPeriodElement,
    "chapter_number" | "id_serie" | "series_image" | "series_name"
  >;
  width?: number;
  height?: number;
};

const MangaCard = ({ data, width, height }: Props) => {
  const navigator = useNavigation();

  const goToMangaScreen = (id: number) => {
    navigator.navigate("manga", {
      id,
    });
  };

  return (
    <MangaCardContainer
      onPress={() => goToMangaScreen(data.id_serie)}
      width={width}
      height={height}
    >
      <MangaCardBadge>
        <Text color="WHITE" size="FONT_XS" weight="WEIGHT_MEDIUM">
          {data.chapter_number}
        </Text>
      </MangaCardBadge>

      <MangaCardImage
        source={{
          uri: data.series_image,
        }}
        resizeMode="cover"
        alt={data.series_name}
      />

      <MangaCardFooter>
        <Text color="WHITE" size="FONT_4XS" weight="WEIGHT_SEMIBOLD">
          {truncateString(data.series_name, 16)}
        </Text>
      </MangaCardFooter>
    </MangaCardContainer>
  );
};

export default memo(MangaCard);
