import React from "react";
import * as S from "./styled";
import Icon from "src/components/Icon";
import ArrowRight from "assets/svg-icon/arrow-right.svg";
import { Text } from "src/components/Text";
import CustomPressable from "src/components/CustomPressable";

type CarouselHeaderProps = {
  title: string;
  handleScreen: () => void;
};

const CarouselHeader = ({ title, handleScreen }: CarouselHeaderProps) => {
  return (
    <S.CarouselHeader>
      <Text weight="WEIGHT_SEMIBOLD">{title}</Text>
      <CustomPressable innerSpace={2} onPress={handleScreen}>
        <Icon icon={ArrowRight} type="stroke" color="#969696" />
      </CustomPressable>
    </S.CarouselHeader>
  );
};

export default CarouselHeader;
