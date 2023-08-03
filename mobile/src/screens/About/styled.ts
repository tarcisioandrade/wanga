import styled from "styled-components/native";
import { phs, pvs } from "src/utils/metrics";
import { Text } from "src/components/Text";

export const AboutText = styled(Text).attrs({
  size: "FONT_2XS",
})``;

export const AboutWrapper = styled.View`
  padding: 0 ${phs(22)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AboutTextWithArrow = styled.View`
  flex-direction: row;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

export const AboutItem = styled.View`
  padding: ${pvs(18)} 0;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.CHAPTER_READ};
`;
