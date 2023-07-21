import { phs, pvs } from "src/utils/metrics";
import styled from "styled-components/native";

type Props = {
  bg: string;
};

export const FeaturedContainer = styled.Pressable<Props>`
  width: ${phs(341)};
  height: ${pvs(219)};
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

export const FeaturedBoxInfo = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  width: 100%;
  justify-content: center;
  gap: 4px;
`;
