import React from "react";
import * as S from "./styled";
import Icon from "src/components/Icon";
import { Text } from "src/components/Text";
import CustomPressable from "src/components/CustomPressable";
import ArrowRightIconly from "assets/svg-icon/arrow-right-iconly.svg";
import { Stack } from "src/components/Layout";

type CarouselHeaderProps = {
  title: string;
  handleScreen: () => void;
};

const CarouselHeader = ({ title, handleScreen }: CarouselHeaderProps) => {
  return (
    <S.CarouselHeader>
      <Text weight="WEIGHT_SEMIBOLD">{title}</Text>
      <CustomPressable innerSpace={2} onPress={handleScreen}>
        <Stack direction="row" align_items="center" pl={8}>
          <Text size="FONT_4XS" color="GRAY_600" weight="WEIGHT_SEMIBOLD">
            Ver Tudo
          </Text>
          <Icon icon={ArrowRightIconly} type="stroke" color="#969696" />
        </Stack>
      </CustomPressable>
    </S.CarouselHeader>
  );
};

export default CarouselHeader;
