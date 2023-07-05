import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import Home from "../screens/home";
import Search from "../screens/search";
import MangaScreen from "src/screens/manga";
import MostReadPeriod from "src/screens/mostReadPeriod";

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
      <Screen name="manga" component={MangaScreen} />
      <Screen name="mostReadPeriod" component={MostReadPeriod} />
    </Navigator>
  );
};

export default HomeStackNavigator;
