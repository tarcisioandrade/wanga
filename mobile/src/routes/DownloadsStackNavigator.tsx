import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import Search from "../screens/search";
import MangaReader from "src/screens/mangaReader";
import Downloads from "src/screens/downloads";

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
      <Screen name="mangaReader" component={MangaReader} />
    </Navigator>
  );
};

export default DownloadsStackNavigator;
