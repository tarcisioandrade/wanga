import { phs, pvs } from "src/utils/metrics";
import styled from "styled-components/native";

export const Intro = styled.View`
  margin-top: ${pvs(40)};
  align-items: center;
`;

export const FormContainer = styled.View`
  margin-top: ${pvs(40)};
  margin-bottom: ${pvs(20)};
  gap: 14px;
`;

export const PoliciesContainer = styled.View`
  padding: 0 ${phs(22)};
  margin-top: auto;
  margin-bottom: ${pvs(40)};
`;
