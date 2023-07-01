import React from "react";
import * as S from "./styled";
import { Title } from "src/components/Title";
import { Text } from "src/components/Text";

type CarouselHeaderProps = {
  title: string;
  handleScreen: () => void;
};

const CarouselHeader = ({ title, handleScreen }: CarouselHeaderProps) => {
  return (
    <S.CarouselHeader>
      <Title>{title}</Title>
      <S.ViewButton onPress={handleScreen}>
        <Text size="FONT_XS" color="GRAY_600">
          Ver Todos
        </Text>
      </S.ViewButton>
    </S.CarouselHeader>
  );
};

export default CarouselHeader;
