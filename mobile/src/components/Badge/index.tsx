import React, { ReactNode } from "react";
import { BadgeText, BadgeContainer } from "./styled";
import { StyleSheet } from "react-native";
import { DefaultTheme } from "styled-components/native";

export type BadgeProps = {
  children: ReactNode;
  type?: "Filled" | "Outlined";
  bg?: keyof DefaultTheme;
};

const Badge = ({ children, type = "Filled", bg }: BadgeProps) => {
  return (
    <BadgeContainer
      bg={bg}
      type={type}
      style={type === "Outlined" && styles.shadow}
    >
      <BadgeText type={type}>{children}</BadgeText>
    </BadgeContainer>
  );
};

export default Badge;

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#00000088",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
