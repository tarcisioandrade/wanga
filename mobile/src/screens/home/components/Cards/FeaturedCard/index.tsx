import React, { memo } from "react";
import { FeaturedElement } from "src/@types/featured";
import { Stack } from "src/components/Layout";
import { FeaturedBoxInfo, FeaturedContainer, FeaturedImage } from "./styled";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { useTheme } from "styled-components";
import { hs, ms } from "src/utils/metrics";

type Props = {
  data: FeaturedElement;
};

const FeaturedCard = ({ data }: Props) => {
  const navigator = useNavigation();
  const theme = useTheme();

  const goToMangaScreen = (id: number) => {
    navigator.navigate("manga", {
      id,
    });
  };

  return (
    <FeaturedContainer
      bg={data.hex_color}
      onPress={() => goToMangaScreen(data.id_serie)}
    >
      <FeaturedImage resizeMode="cover" source={{ uri: data.featured_image }} />
      <FeaturedBoxInfo>
        <Text
          numberOfLines={2}
          style={{
            fontFamily: theme.FONT_FEATURED,
            color: theme.ORANGE_500,
            fontSize: ms(26),
            maxWidth: hs(300),
          }}
        >
          {data.series_name}
        </Text>
        <Stack direction="row" gap={4}>
          <Text
            style={{
              fontFamily: theme.FONT_FEATURED,
              color: theme.ORANGE_500,
              fontSize: ms(16),
            }}
          >
            Cap
          </Text>
          <Text
            style={{
              fontFamily: theme.FONT_FEATURED,
              color: theme.ORANGE_500,
              fontSize: ms(16),
            }}
          >
            {data.chapter.number}
          </Text>
        </Stack>
      </FeaturedBoxInfo>
    </FeaturedContainer>
  );
};

export default memo(FeaturedCard);
