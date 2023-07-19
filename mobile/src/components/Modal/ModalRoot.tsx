import { Modal as ModalRN, Pressable } from "react-native";
import React, { ReactNode } from "react";
import * as S from "./styled";
import ModalHeader from "./ModalHeader";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
};

const ModalRoot = ({ children, isOpen, onClose, ...props }: Props) => {
  const childrens = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === ModalHeader) {
      //@ts-ignore
      return React.cloneElement(child, { onClose });
    }
    return child;
  });

  if (!isOpen) return null;
  return (
    <S.ModalWrapper>
      <ModalRN
        transparent
        animationType="none"
        visible={isOpen}
        onRequestClose={onClose}
        {...props}
      >
        <S.ModalCentered>
          <S.ModalContainer>{childrens}</S.ModalContainer>
        </S.ModalCentered>
      </ModalRN>
    </S.ModalWrapper>
  );
};

export default ModalRoot;
