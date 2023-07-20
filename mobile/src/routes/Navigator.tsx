import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerParamList } from "../@types/navigation";
import Favorites from "../screens/Favorites";
import CustomDrawer from "src/components/CustomDrawer";
import HomeStackNavigator from "./HomeStackNavigator";
import DownloadsStackNavigator from "./DownloadsStackNavigator";
import HistoricStackNavigator from "./HistoricStackNavigator";

const { Screen, Navigator } = createDrawerNavigator<DrawerParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="drawerHome"
        screenOptions={{
          headerTitle: "",
          drawerStyle: {
            backgroundColor: "transparent",
          },
          headerShown: false,
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
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
          component={Favorites}
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
    </NavigationContainer>
  );
};

export default Routes;
