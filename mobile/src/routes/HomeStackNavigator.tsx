import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import Home from "../screens/home";
import Search from "../screens/search";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="search" component={Search} />
    </Navigator>
  );
};

export default HomeStackNavigator;
