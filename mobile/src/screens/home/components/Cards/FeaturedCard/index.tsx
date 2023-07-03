import React from "react";
import { Text } from "src/components/Text";
import { truncateString } from "src/utils/truncateString";
import { FeaturedElement } from "src/@types/featured";
import BooksIcon from "assets/svg-icon/books.svg";
import { Stack } from "src/components/Layout";
import {
  FeaturedBoxInfo,
  FeaturedContainer,
  FeaturedHeader,
  FeaturedImage,
} from "./styled";

type Props = {
  data: FeaturedElement;
};

const FeaturedCard = ({ data }: Props) => {
  return (
    <FeaturedContainer bg={data.hex_color}>
      <FeaturedImage resizeMode="cover" source={{ uri: data.featured_image }} />
      <FeaturedHeader>
        <Text color="WHITE" size="FONT_4XS">
          Destaque
        </Text>
      </FeaturedHeader>
      <FeaturedBoxInfo>
        <Text color="WHITE" size="FONT_XS" weight="WEIGHT_MEDIUM">
          {truncateString(data.series_name, 16)}
        </Text>
        <Stack direction="row" gap={4}>
          <BooksIcon />
          <Text color="WHITE" size="FONT_BASE" weight="WEIGHT_MEDIUM">
            {data.chapter.number}
          </Text>
        </Stack>
      </FeaturedBoxInfo>
    </FeaturedContainer>
  );
};

export default FeaturedCard;
