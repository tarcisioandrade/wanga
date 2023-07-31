import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerParamList } from "../@types/navigation";
import MenuDrawer from "src/components/MenuDrawer";
import HomeStackNavigator from "./HomeStackNavigator";
import DownloadsStackNavigator from "./DownloadsStackNavigator";
import HistoricStackNavigator from "./HistoricStackNavigator";
import FavoritesStackNavigator from "./FavoritesStackNavigator";

const { Screen, Navigator } = createDrawerNavigator<DrawerParamList>();

const MenuDrawerNavigator = () => {
  return (
    <Navigator
      initialRouteName="drawerHome"
      screenOptions={{
        headerTitle: "",
        drawerStyle: {
          backgroundColor: "transparent",
        },
        headerShown: false,
        drawerPosition: "left",
        swipeEnabled: false,
      }}
      id="MenuDrawer"
      drawerContent={(props) => <MenuDrawer {...props} />}
      useLegacyImplementation
    >
      <Screen
        name="drawerHome"
        options={{
          title: "Home",
        }}
        component={HomeStackNavigator}
      />
      <Screen
        name="drawerFavorites"
        options={{
          title: "Favoritos",
        }}
        component={FavoritesStackNavigator}
      />
      <Screen
        name="drawerHistoric"
        options={{
          title: "Histórico",
        }}
        component={HistoricStackNavigator}
      />
      <Screen
        name="drawerDownloads"
        options={{
          title: "Downloads",
        }}
        component={DownloadsStackNavigator}
      />
    </Navigator>
  );
};

export default MenuDrawerNavigator;
