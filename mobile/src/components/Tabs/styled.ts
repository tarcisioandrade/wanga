import styled from "styled-components/native";
import { phs, pvs } from "../../utils/metrics";

type TabActive = {
  active: boolean;
};

export const STabsContainer = styled.View`
  flex-direction: row;
  gap: 6px;
  align-items: center;
  margin-top: ${pvs(16)};
`;

export const STabItem = styled.Pressable<TabActive>`
  padding: ${pvs(8)} ${phs(10)};
  background-color: ${(props) =>
    props.active ? props.theme.PRIMARY : props.theme.TAB_ITEM_COLOR};
  border-radius: 8px;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;
