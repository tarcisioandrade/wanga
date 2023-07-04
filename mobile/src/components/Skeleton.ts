import { phs, pvs } from "src/utils/metrics";
import styled from "styled-components/native";

type SkeletonProps = {
  width: number | string;
  height: number;
  radius?: number;
  mt?: number;
};

export const Skeleton = styled.View<SkeletonProps>`
  background-color: ${(props) => props.theme.SEKELETON_COLOR};
  width: ${(props) =>
    typeof props.width === "string" ? props.width : phs(props.width)};
  height: ${(props) => phs(props.height)};

  border-radius: ${(props) => props.radius && props.radius + "px"};
  margin-top: ${(props) => (props.mt ? pvs(props.mt) : 0)};
`;
