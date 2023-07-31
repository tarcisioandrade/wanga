import { pvs, phs } from "src/utils/metrics";
import styled from "styled-components/native";

export const DownloadItemContainer = styled.Pressable`
  flex-direction: row;
  background-color: ${(props) => props.theme.SECONDARY};
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: ${pvs(12)} ${phs(12)};
  border-radius: 8px;
`;

export const IconWrapper = styled.View`
  padding: 0 ${phs(6)};
  width: ${phs(32)};
`;
