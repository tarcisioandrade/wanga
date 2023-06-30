import styled from "styled-components/native";

export const Title = styled.Text`
  font-size: ${(props) => props.theme.FONT_MD};
  color: ${(props) => props.theme.TEXT_COLOR};
  font-weight: 600;
  line-height: 22px;
`;
