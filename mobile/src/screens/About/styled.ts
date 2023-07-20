import styled from "styled-components/native";
import { Stack } from "src/components/Layout";
import { phs, pvs } from "src/utils/metrics";
import { Text } from "src/components/Text";

export const AboutText = styled(Text).attrs({
  size: "FONT_2XS",
})`
  padding: 0 ${phs(22)};
`;

export const AboutItem = styled(Stack)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${pvs(18)} 0;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.CHAPTER_READ};
`;
