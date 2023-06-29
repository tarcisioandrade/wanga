import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import React from "react";
import { STabItem, STabText, STabsContainer } from "./styled";

export type TabType = {
  value: string;
  label: string;
};

type TabsProps = {
  tabs: TabType[];
  activeTab: string;
  onTabChange?: (value: string) => void;
};

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  const handleTabChange = (value: string) => {
    if (onTabChange) {
      onTabChange(value);
    }
  };

  return (
    <STabsContainer>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <STabItem
            active={isActive}
            key={tab.value}
            onPress={() => handleTabChange(tab.value)}
            style={styles.shadow}
          >
            <STabText active={isActive}>{tab.label}</STabText>
          </STabItem>
        );
      })}
    </STabsContainer>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#00000088",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
