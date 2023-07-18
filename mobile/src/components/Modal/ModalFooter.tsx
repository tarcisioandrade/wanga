import React, { ReactNode } from "react";
import * as S from "./styled";

type Props = {
  children: ReactNode;
};
const ModalFooter = ({ children }: Props) => {
  return <S.ModalFooter>{children}</S.ModalFooter>;
};

export default ModalFooter;
