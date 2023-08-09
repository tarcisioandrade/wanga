import React from "react";
import * as S from "./styled";
import { Text } from "src/components/Text";
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
    // navigator.navigate("manga", {
    //   id,
    // });
  };

  return (
    <S.MangaCardContainer
      onPress={() => goToMangaScreen(data.id_serie)}
      width={width}
      height={height}
    >
      <S.MangaCardBadge>
        <Text color="WHITE" size="FONT_XS" weight="WEIGHT_MEDIUM">
          {data.chapter_number}
        </Text>
      </S.MangaCardBadge>

      <S.MangaCardImage
        source={{
          uri: data.series_image,
        }}
        resizeMode="cover"
        alt={data.series_name}
      />

      <S.MangaCardFooter>
        <Text color="WHITE" size="FONT_4XS" weight="WEIGHT_SEMIBOLD">
          {truncateString(data.series_name, 16)}
        </Text>
      </S.MangaCardFooter>
    </S.MangaCardContainer>
  );
};

export default MangaCard;
