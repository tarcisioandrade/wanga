import React from "react";
import * as S from "./styled";
import Icon from "src/components/Icon";
import ArrowRight from "assets/svg-icon/arrow-right.svg";
import { Text } from "src/components/Text";

type CarouselHeaderProps = {
  title: string;
  handleScreen: () => void;
};

const CarouselHeader = ({ title, handleScreen }: CarouselHeaderProps) => {
  return (
    <S.CarouselHeader>
      <Text weight="WEIGHT_SEMIBOLD">{title}</Text>
      <S.ViewButton onPress={handleScreen}>
        <Icon icon={ArrowRight} type="stroke" color="#969696" />
      </S.ViewButton>
    </S.CarouselHeader>
  );
};

export default CarouselHeader;
