import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import Search from "../screens/search";
import MangaScreen from "src/screens/manga";
import Historic from "src/screens/Historic";
import MangaReader from "src/screens/mangaReader";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const HistoricStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="historic"
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Screen name="historic" component={Historic} />
      <Screen name="search" component={Search} />
      <Screen name="manga" component={MangaScreen} />
      <Screen name="mangaReader" component={MangaReader} />
    </Navigator>
  );
};

export default HistoricStackNavigator;
