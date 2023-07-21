import styled from "styled-components/native";
import { DrawerContainer } from "src/components/MenuDrawer/styled";
import Constants from "expo-constants";
import { phs, pvs } from "src/utils/metrics";

export const DrawerCategoryContainer = styled(DrawerContainer)`
  padding-top: ${Constants.statusBarHeight + 10 + "px"};
`;

export const CategoryItem = styled.Pressable`
  border-left-width: 3px;
  border-left-color: ${(props) => props.theme.PRIMARY};
  padding: ${pvs(10)} ${phs(10)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 4px;
  background-color: ${(props) => props.theme.SECONDARY};
`;

export const AmountBox = styled.View`
  background-color: ${(props) => props.theme.AMOUNT_COLOR};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${pvs(4)} ${phs(6)};
  gap: 4px;
`;
