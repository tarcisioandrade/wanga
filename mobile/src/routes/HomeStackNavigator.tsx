import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../@types/navigation";
import Home from "../screens/home";
import Search from "../screens/search";
import MangaScreen from "src/screens/manga";
import MostReadPeriod from "src/screens/mostReadPeriod";
import MangaReader from "src/screens/mangaReader";
import Release from "src/screens/release";
import About from "src/screens/about";
import Settings from "src/screens/settings";
import Category from "src/screens/category";
import Login from "src/screens/login";
import Register from "src/screens/register";
import ForgotPassword from "src/screens/forgotPassword";

const { Navigator, Screen, Group } =
  createNativeStackNavigator<RootStackParamList>();

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
      <Screen name="category" component={Category} />
      <Group screenOptions={{ animation: "none" }}>
        <Screen name="about" component={About} />
        <Screen name="settings" component={Settings} />
      </Group>
      <Group screenOptions={{ animation: "none" }}>
        <Screen name="login" component={Login} />
        <Screen name="register" component={Register} />
        <Screen name="forgotPassword" component={ForgotPassword} />
      </Group>
    </Navigator>
  );
};

export default HomeStackNavigator;
