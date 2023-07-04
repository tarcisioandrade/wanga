import { phs, pvs } from "src/utils/metrics";
import styled, { css } from "styled-components/native";

type ImageProps = {
  width: number;
  height: number;
  radius?: number;
};

export const Image = styled.Image<ImageProps>`
  width: ${(props) => phs(props.width)};
  height: ${(props) => pvs(props.height)};

  ${(props) =>
    props.radius &&
    css`
      border-radius: ${props.radius + "px"};
    `}
`;
