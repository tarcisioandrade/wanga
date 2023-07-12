import { phs, pvs } from "src/utils/metrics";
import { DefaultTheme } from "styled-components";
import styled from "styled-components/native";

type Props = {
  pressed: boolean;
  innerSpace?: number;
  bgPressed?: string;
};

export const PressableWrapper = styled.View<Props>`
  background-color: ${(props) =>
    props.pressed
      ? props.bgPressed
        ? props.bgPressed
        : props.theme.SEKELETON_COLOR
      : "transparent"};
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
