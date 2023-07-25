import { Dimensions } from "react-native";
import { phs, pvs } from "src/utils/metrics";
import styled from "styled-components/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export const ModalWrapper = styled.View`
  width: ${width + "px"};
  height: ${height + "px"};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
`;

export const ModalCentered = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${0} ${phs(22)};
`;

export const ModalContent = styled.View`
  width: 100%;
  padding: ${pvs(12)} ${phs(22)};
  min-height: ${pvs(80)};
`;

export const ModalContainer = styled.View`
  border-radius: 8px;
  overflow: hidden;
  background-color: ${(props) => props.theme.BG_COLOR};
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: ${pvs(12)} ${phs(22)};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.CHAPTER_READ};
`;

export const ModalFooter = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: ${pvs(12)} ${phs(22)};
  gap: 36px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.CHAPTER_READ};
`;
