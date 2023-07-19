import { Text } from "src/components/Text";
import { pvs } from "src/utils/metrics";
import styled from "styled-components/native";

export const SettingTitle = styled(Text).attrs({
  size: "FONT_XS",
  color: "GRAY_500",
  weight: "WEIGHT_MEDIUM",
})`
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.CHAPTER_READ};
  padding-bottom: ${pvs(6)};
  margin-bottom: ${pvs(12)};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const SettingItem = styled.View`
  margin-top: ${pvs(16)};
`;
