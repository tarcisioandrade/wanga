import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import Home from "../screens/home";
import Search from "../screens/search";
import MangaScreen from "src/screens/manga";
import MostReadPeriod from "src/screens/mostReadPeriod";
import MangaReader from "src/screens/mangaReader";
import Release from "src/screens/Release";
import About from "src/screens/About";
import Settings from "src/screens/Settings";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Screen name="home" component={Home} />
      <Screen name="search" component={Search} />
      <Screen name="manga" component={MangaScreen} />
      <Screen name="mostReadPeriod" component={MostReadPeriod} />
      <Screen name="mangaReader" component={MangaReader} />
      <Screen name="release" component={Release} />
      <Screen name="about" component={About} options={{ animation: "none" }} />
      <Screen
        name="settings"
        component={Settings}
        options={{ animation: "none" }}
      />
    </Navigator>
  );
};

export default HomeStackNavigator;
