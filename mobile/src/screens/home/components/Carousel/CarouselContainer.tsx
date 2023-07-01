import React, { ReactNode } from "react";

import * as S from "./styled";

type CarouselContainerProps = {
  children: ReactNode;
};

const CarouselContainer = ({ children }: CarouselContainerProps) => {
  return <S.CarouselContainer>{children}</S.CarouselContainer>;
};

export default CarouselContainer;
