import { pvs } from "src/utils/metrics";
import styled from "styled-components/native";

export const DownloadItemContainer = styled.Pressable`
  flex-direction: row;
  padding-bottom: ${pvs(12)};
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.PRIMARY};
  /* background-color: red; */
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;
