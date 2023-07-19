import { phs, pvs } from "src/utils/metrics";
import styled from "styled-components/native";

type Props = {
  pressed: boolean;
  innerSpace?: number;
  bgPressed?: string;
  radius?: number;
};

export const PressableWrapper = styled.View<Props>`
  background-color: ${(props) =>
    props.pressed
      ? props.bgPressed
        ? props.bgPressed
        : props.theme.SKELETON_COLOR
      : "transparent"};
  padding: ${(props) =>
    props.innerSpace
      ? `${pvs(props.innerSpace)} ${phs(props.innerSpace)}`
      : "9px"};
  border-radius: ${(props) => (props.radius ? props.radius + "px" : "100px")};
  margin: ${(props) =>
    props.innerSpace
      ? `-${pvs(props.innerSpace)} -${phs(props.innerSpace)}`
      : "-9px"};
`;
