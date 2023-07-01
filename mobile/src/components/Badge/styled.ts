import styled from "styled-components/native";

export const BadgeContainer = styled.View`
  background-color: ${(props) => props.theme.PRIMARY};
  padding: 2px 10px;
  border-radius: 4px;
  align-self: flex-start;
`;

export const BadgeText = styled.Text`
  color: ${(props) => props.theme.WHITE};
  font-size: ${(props) => props.theme.FONT_XXS};
`;
