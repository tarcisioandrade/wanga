import { phs, pvs } from "src/utils/metrics";
import styled from "styled-components/native";

type Props = {
  pressed: boolean;
  innerSpace?: number;
};

export const PressableWrapper = styled.View<Props>`
  background-color: ${(props) =>
    props.pressed ? props.theme.SEKELETON_COLOR : "transparent"};
  padding: ${(props) =>
    props.innerSpace
      ? `${pvs(props.innerSpace)} ${phs(props.innerSpace)}`
      : "9px"};
  border-radius: 100px;
  margin: ${(props) =>
    props.innerSpace
      ? `-${pvs(props.innerSpace)} -${phs(props.innerSpace)}`
      : "-9px"};
`;
