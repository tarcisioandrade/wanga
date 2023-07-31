import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import Search from "../screens/search";
import MangaScreen from "src/screens/manga";
import MangaReader from "src/screens/mangaReader";
import Favorites from "src/screens/Favorites";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const FavoritesStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="favorites"
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Screen name="favorites" component={Favorites} />
      <Screen name="search" component={Search} />
      <Screen name="manga" component={MangaScreen} />
      <Screen name="mangaReader" component={MangaReader} />
    </Navigator>
  );
};

export default FavoritesStackNavigator;
