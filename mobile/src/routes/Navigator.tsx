import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerParamList, RootStackParamList } from "../@types/navigation";
import Header from "src/components/Header";
import Favorites from "../screens/Favorites";
import Historic from "../screens/Historic";
import CustomDrawer from "src/components/CustomDrawer";
import HomeStackNavigator from "./HomeStackNavigator";

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
          component={Historic}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Routes;
