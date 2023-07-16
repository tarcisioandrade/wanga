import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import Search from "../screens/search";
import Downloads from "src/screens/downloads";
import MangaScreen from "src/screens/manga";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const DownloadsStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="downloads"
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Screen name="downloads" component={Downloads} />
      <Screen name="search" component={Search} />
      <Screen name="manga" component={MangaScreen} />
    </Navigator>
  );
};

export default DownloadsStackNavigator;
