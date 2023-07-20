import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import Search from "../screens/search";
import MangaScreen from "src/screens/manga";
import Historic from "src/screens/Historic";

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
    </Navigator>
  );
};

export default HistoricStackNavigator;
