import React, { ReactNode } from "react";
import * as S from "./styled";

type Props = {
  children: ReactNode;
};

const ModalContent = ({ children }: Props) => {
  return <S.ModalContent>{children}</S.ModalContent>;
};

export default ModalContent;
