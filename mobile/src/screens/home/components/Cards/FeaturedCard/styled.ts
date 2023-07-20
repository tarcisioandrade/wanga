import { phs, pvs } from "src/utils/metrics";
import styled from "styled-components/native";

type Props = {
  bg: string;
};

export const FeaturedContainer = styled.Pressable<Props>`
  width: ${phs(341)};
  height: ${pvs(229)};
  border-radius: 8px;
  background-color: ${(props) => (props.bg ? "#" + props.bg : "#00000016")};
  position: relative;
  margin: 0 auto;
  margin-left: 7.6%;
  overflow: hidden;
`;

export const FeaturedImage = styled.Image`
  width: 100%;
  height: ${pvs(166)};
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
`;

export const FeaturedHeader = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: ${phs(100)};
  background-color: ${(props) => props.theme.BLACK_TRANSPARENT};
  border-bottom-right-radius: 4px;
  padding-left: ${phs(16)};
  justify-content: center;
  height: ${pvs(25)};
`;

export const FeaturedBoxInfo = styled.View`
  background-color: ${(props) => props.theme.BLACK_TRANSPARENT};
  position: absolute;
  top: ${pvs(40)};
  left: 0;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: ${phs(169)};
  height: ${pvs(56)};
  padding-left: ${phs(16)};
  justify-content: center;
  gap: 4px;
`;
