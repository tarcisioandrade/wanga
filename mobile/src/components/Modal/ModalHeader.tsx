import React, { ReactNode } from "react";
import * as S from "./styled";
import CustomPressable from "../CustomPressable";
import Icon from "../Icon";
import CloseIcon from "assets/svg-icon/close.svg";
import { Text } from "../Text";

type Props = {
  onClose?: () => void;
  children?: ReactNode;
};
const ModalHeader = ({ children, onClose }: Props) => {
  return (
    <S.ModalHeader>
      <Text>{children}</Text>
      <CustomPressable onPress={onClose}>
        <Icon icon={CloseIcon} type="fill" />
      </CustomPressable>
    </S.ModalHeader>
  );
};

export default ModalHeader;
