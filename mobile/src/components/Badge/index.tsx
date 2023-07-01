import React, { ReactNode } from "react";
import { BadgeText, BadgeContainer } from "./styled";

type Props = {
  children: ReactNode;
};

const BadgePrimary = ({ children }: Props) => {
  return (
    <BadgeContainer>
      <BadgeText>{children}</BadgeText>
    </BadgeContainer>
  );
};

export default BadgePrimary;
